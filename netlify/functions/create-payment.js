import crypto from "crypto";
import { appendOrder } from "./shared/sheets.js";

const TARIFFS = {
  base: {
    name: "БАЗА",
    amount: 1499,
    productName: "ТІКТОК НА МІЛЬЙОН — тариф БАЗА",
  },
  pro: {
    name: "PRO",
    amount: 3499,
    productName: "ТІКТОК НА МІЛЬЙОН — тариф PRO",
  },
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
    body: JSON.stringify(body),
  };
}

function hmacMd5(value, secret) {
  return crypto.createHmac("md5", secret).update(value, "utf8").digest("hex");
}

function normalizePhone(phone) {
  return String(phone || "").replace(/[^\d+]/g, "");
}

function makeOrderReference() {
  const timestamp = Date.now();
  const random = crypto.randomBytes(4).toString("hex");
  return `KOST-${timestamp}-${random}`;
}

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { message: "Method not allowed." });
  }

  try {
    const { name, phone, telegram, email, packageId } = JSON.parse(event.body || "{}");

    const tariff = TARIFFS[packageId];

    if (!tariff) {
      return json(400, { message: "Некоректний тариф." });
    }

    if (!name || !phone || !telegram || !email) {
      return json(400, { message: "Заповніть усі обов’язкові поля." });
    }

    const merchantAccount = process.env.WAYFORPAY_MERCHANT_ACCOUNT;
    const merchantSecret = process.env.WAYFORPAY_MERCHANT_SECRET_KEY;
    const merchantDomainName = process.env.WAYFORPAY_MERCHANT_DOMAIN || "kostochka.org";

    if (!merchantAccount || !merchantSecret) {
      throw new Error("WayForPay environment variables are missing.");
    }

    const orderReference = makeOrderReference();
    const orderDate = Math.floor(Date.now() / 1000);
    const amount = String(tariff.amount);
    const currency = "UAH";
    const productName = [tariff.productName];
    const productCount = ["1"];
    const productPrice = [amount];

    const signatureString = [
      merchantAccount,
      merchantDomainName,
      orderReference,
      orderDate,
      amount,
      currency,
      ...productName,
      ...productCount,
      ...productPrice,
    ].join(";");

    const merchantSignature = hmacMd5(signatureString, merchantSecret);

    const baseUrl = process.env.SITE_URL || "https://kostochka.org";

    const form = new URLSearchParams();
    form.append("merchantAccount", merchantAccount);
    form.append("merchantAuthType", "SimpleSignature");
    form.append("merchantDomainName", merchantDomainName);
    form.append("merchantTransactionType", "AUTO");
    form.append("merchantTransactionSecureType", "AUTO");
    form.append("merchantSignature", merchantSignature);
    form.append("language", "UA");
    form.append("returnUrl", `${baseUrl}/payment-success`);
    form.append("serviceUrl", `${baseUrl}/.netlify/functions/wayforpay-callback`);
    form.append("orderReference", orderReference);
    form.append("orderDate", String(orderDate));
    form.append("amount", amount);
    form.append("currency", currency);
    form.append("orderTimeout", "3600");
    form.append("productName[]", productName[0]);
    form.append("productCount[]", productCount[0]);
    form.append("productPrice[]", productPrice[0]);
    form.append("clientFirstName", String(name).trim());
    form.append("clientEmail", String(email).trim());
    form.append("clientPhone", normalizePhone(phone));
    form.append("defaultPaymentSystem", "card");

    await appendOrder([
      new Date().toISOString(),
      new Date().toISOString(),
      orderReference,
      "NEW",
      tariff.name,
      amount,
      currency,
      String(name).trim(),
      normalizePhone(phone),
      String(telegram).trim(),
      String(email).trim(),
      "",
      "",
      "",
      "WAITING_FOR_PAYMENT",
      "Order created before WayForPay redirect.",
    ]);

    const response = await fetch("https://secure.wayforpay.com/pay?behavior=offline", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: form.toString(),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.url) {
      return json(502, {
        message: "WayForPay не повернув посилання на оплату.",
        orderReference,
        details: data,
      });
    }

    return json(200, {
      orderReference,
      paymentUrl: data.url,
    });
  } catch (error) {
    console.error("create-payment error:", error);

    return json(500, {
      message: "Не вдалося створити платіж. Спробуйте ще раз або зверніться до підтримки.",
    });
  }
};