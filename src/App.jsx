import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_SRC = "/kostochka-logo.jpg";
const PHOTO_SRC = "/kostochka-photo.jpg";
const ABOUT_PHOTO_SRC = "/kostochka-photo-alternative.jpg";

const pagePaths = {
  about: "/",
  program: "/program",
  offer: "/offer",
  refund: "/refund",
  privacy: "/privacy",
  contacts: "/contacts",
  paymentSuccess: "/payment-success",
  paymentDeclined: "/payment-declined",
};

const pageTitles = {
  about: "КУРС ТІКТОК НА МІЛЬЙОН",
  program: "Програма - Артем Косточка",
  offer: "Публічна оферта - Артем Косточка",
  refund: "Політика повернення - Артем Косточка",
  privacy: "Політика конфіденційності - Артем Косточка",
  contacts: "Контакти - Артем Косточка",
  paymentSuccess: "Оплату прийнято - Артем Косточка",
  paymentDeclined: "Оплату не завершено - Артем Косточка",
};

function getPageFromPath() {
  if (typeof window === "undefined") return "about";

  const path = window.location.pathname.replace(/\/$/, "") || "/";

  if (path === "/program") return "program";
  if (path === "/offer") return "offer";
  if (path === "/refund") return "refund";
  if (path === "/privacy") return "privacy";
  if (path === "/contacts") return "contacts";
  if (path === "/payment-success") return "paymentSuccess";
  if (path === "/payment-declined") return "paymentDeclined";

  return "about";
}

const modules = [
  {
    number: "01",
    title: "Чому не дивляться + формула утримання",
    description:
      "Психологія глядача та 3 етапи відео, які неможливо прогорнути.",
  },
  {
    number: "02",
    title: "Метод «Позичання»",
    description:
      "Як брати чужі тренди і робити їх унікальними, щоб вони залітали на мільйони.",
  },
  {
    number: "03",
    title: "Сценарій-магніт за 5 хвилин",
    description:
      "Структура написання текстів, щоб звучати живо, а не як робот.",
  },
  {
    number: "04",
    title: "Монтаж у CapCut",
    description:
      "Секрети динаміки: як вирізати паузи, робити «вкиди» та утримувати увагу звуковими акцентами.",
  },
  {
    number: "05",
    title: "Техніка: світло та звук",
    description:
      "Налаштування камери, робота з денним світлом та секрети ідеального звуку.",
  },
  {
    number: "06",
    title: "Алгоритми 2026: сувора правда",
    description:
      "На що реально дивиться TikTok і чому хештеги більше не працюють.",
  },
  {
    number: "07",
    title: "TikTok для бізнесу: продажі",
    description:
      "Як продавати свої товари без прямого «впарювання» і вітрини.",
  },
  {
    number: "08",
    title: "Особистий бренд",
    description:
      "Як знайти свій «якір» і чому люди будуть купувати саме у тебе.",
  },
  {
    number: "09",
    title: "Аналіз помилок",
    description:
      "Як реанімувати відео, яке набрало 200 переглядів.",
  },
  {
    number: "10",
    title: "Робота з брендами",
    description:
      "Як правильно писати бізнесам, пропонувати ідеї та скільки брати грошей за роботу.",
  },
  {
    number: "11",
    title: "Фінал: дисципліна та хейт",
    description:
      "Як не здатися, коли немає мотивації, і що робити з тиском оточення.",
  },
];

const outcomes = [
  "Зрозумієш, чому твої відео не утримують увагу",
  "Навчишся швидко знаходити і адаптувати тренди",
  "Почнеш писати сценарії живою мовою без штучності",
  "Зрозумієш базову техніку світла, звуку і монтажу",
  "Навчишся просувати бізнес через контент без прямого впарювання",
  "Отримаєш систему дій, яку можна повторювати щотижня",
];

const packages = [
  {
    id: "base",
    name: "БАЗА",
    label: "Самостійний",
    price: "1499 грн",
    amount: 1499,
    subtitle:
      "Ідеально для тих, хто має залізну дисципліну та звик рухатися у своєму темпі.",
    button: "Обрати тариф «База»",
    features: [
      "Доступ до всіх 11 практичних модулів",
      "Доступ до закритого Telegram-каналу з відеоуроками",
      "Домашні завдання після кожного уроку для самостійного виконання",
      "Доступ до матеріалів назавжди",
    ],
    recommended: false,
  },
  {
    id: "pro",
    name: "PRO",
    label: "З моєю підтримкою",
    price: "3499 грн",
    amount: 3499,
    subtitle:
      "Для тих, хто хоче максимальний результат, особистий фідбек та сильне оточення.",
    button: "Обрати тариф «PRO»",
    features: [
      "Усі матеріали тарифу «База»",
      "Особиста перевірка кожної домашки з поясненням помилок",
      "Закритий чат учасників для розборів, нетворкінгу та підтримки",
      "Прямий зворотний зв’язок по ідеях, сценаріях і подачі",
      "Додаткові фішки, інсайди та розбори поза основною програмою",
      "Підійде, якщо хочеш не просто дивитися уроки, а отримувати правки по своїх відео, ідеях і сценаріях",
    ],
    recommended: true,
  },
];

const faqs = [
  {
    question: "Це курс тільки для блогерів?",
    answer:
      "Ні. Курс підходить для локального бізнесу, експертів, власників Telegram-каналів, початківців у контенті та людей, які хочуть просувати себе або свої послуги через Instagram, TikTok і Telegram.",
  },
  {
  question: "Чи потрібна велика аудиторія на старті?",
  answer:
    "Ні. Курс побудований так, щоб ти міг стартувати навіть із маленькою аудиторією: зрозуміти свою подачу, створити систему контенту й поступово перетворювати увагу в довіру та заявки.",
},
  {
    question: "Скільки потрібно часу на навчання?",
    answer:
      "Достатньо виділяти декілька годин на день: подивитися урок, виконати домашнє завдання, проаналізувати помилки й одразу застосувати матеріал на своєму контенті. Головне — не просто дивитися, а робити.",
  },
  {
    question: "Де будуть уроки?",
    answer:
      "Уроки будуть у закритому Telegram-каналі. Після успішної оплати ти отримаєш доступ відповідно до обраного тарифу.",
  },
  {
    question: "Чим відрізняється PRO від БАЗИ?",
    answer:
      "У тарифі «База» ти проходиш матеріали самостійно. У тарифі «PRO» отримуєш перевірку домашніх завдань, закритий чат учасників, прямий зворотний зв’язок і додаткові розбори.",
  },
  {
    question: "Що робити, якщо виникли проблеми з оплатою або доступом?",
    answer:
      "Якщо виникли проблеми або запитання: +380 50 234 61 48.",
  },
];

const seller = {
  name: "ФОП Кость Артем Сергійович",
  taxId: "3795301399",
  address: "Україна, м. Луцьк, вул. Стрілецька, 6а",
  email: "kostartemko@gmail.com",
  phone: "+380 50 234 61 48",
};

export default function CourseLandingSite() {
  const [activePage, setActivePage] = useState(() => getPageFromPath());
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePackage, setActivePackage] = useState("pro");
  const [openFaq, setOpenFaq] = useState(0);
  const [imageErrors, setImageErrors] = useState({ logo: false, photo: false });
  const [formStatus, setFormStatus] = useState({ loading: false, error: "" });
  const [pendingScrollTarget, setPendingScrollTarget] = useState(null);

  const selectedPackage = useMemo(
    () => packages.find((item) => item.id === activePackage) ?? packages[1],
    [activePackage]
  );

  useEffect(() => {
    document.title = pageTitles[activePage] ?? pageTitles.about;
  }, [activePage]);

  useEffect(() => {
    const handlePopState = () => setActivePage(getPageFromPath());

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const targetId = pendingScrollTarget || window.location.hash.replace("#", "");

    if (activePage !== "program" || !targetId) return;

    let attempts = 0;
    const maxAttempts = 12;

    const scrollWhenReady = () => {
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setPendingScrollTarget(null);
        return;
      }

      attempts += 1;
      if (attempts < maxAttempts) {
        window.setTimeout(scrollWhenReady, 80);
      }
    };

    window.setTimeout(scrollWhenReady, 100);
  }, [activePage, pendingScrollTarget]);

  const navigateTo = (page, targetId = null) => {
    const nextPath = pagePaths[page] ?? "/";
    const currentPath = `${window.location.pathname}${window.location.hash}`;
    const nextUrl = targetId ? `${nextPath}#${targetId}` : nextPath;

    setActivePage(page);
    setMenuOpen(false);

    if (targetId) {
      setPendingScrollTarget(targetId);
    }

    if (currentPath !== nextUrl) {
      window.history.pushState({ page }, "", nextUrl);
    }

    if (!targetId) {
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 80);
    }
  };

  const handlePackageSelect = (packageId) => {
    setActivePackage(packageId);
    navigateTo("program", "apply");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus({ loading: true, error: "" });

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      telegram: String(formData.get("telegram") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      amount: selectedPackage.amount,
      currency: "UAH",
      source: "kostochka.org",
    };

    try {
      const response = await fetch("/.netlify/functions/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message || "Не вдалося створити платіж.");
      }

      const paymentUrl = data?.paymentUrl || data?.checkoutUrl || data?.url;

      if (!paymentUrl) {
        throw new Error("Платіж створено, але посилання на оплату не отримано.");
      }

      window.location.href = paymentUrl;
    } catch (error) {
      setFormStatus({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Не вдалося перейти до оплати. Спробуй ще раз або звернись за номером +380 50 234 61 48.",
      });
    }
  };

  const sharedProps = {
    activePackage,
    selectedPackage,
    openFaq,
    imageErrors,
    formStatus,
    setActivePackage,
    setOpenFaq,
    setImageErrors,
    handlePackageSelect,
    handleSubmit,
    navigateTo,
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-white selection:text-black">
      <BackgroundGlow />

      <Header
        activePage={activePage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        imageErrors={imageErrors}
        setImageErrors={setImageErrors}
        navigateTo={navigateTo}
      />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
          >
            <PageRenderer activePage={activePage} sharedProps={sharedProps} />
          </motion.div>
        </AnimatePresence>
      </main>

      {activePage === "program" && <MobileStickyCta navigateTo={navigateTo} />}

      <Footer imageErrors={imageErrors} setImageErrors={setImageErrors} navigateTo={navigateTo} />
    </div>
  );
}

function PageRenderer({ activePage, sharedProps }) {
  if (activePage === "program") return <ProgramPage {...sharedProps} />;
  if (activePage === "offer") return <OfferPage />;
  if (activePage === "refund") return <RefundPage />;
  if (activePage === "privacy") return <PrivacyPage />;
  if (activePage === "contacts") return <ContactsPage />;
  if (activePage === "paymentSuccess") return <PaymentSuccessPage navigateTo={sharedProps.navigateTo} />;
  if (activePage === "paymentDeclined") return <PaymentDeclinedPage navigateTo={sharedProps.navigateTo} />;
  return <AboutPage {...sharedProps} />;
}

function Header({ activePage, menuOpen, setMenuOpen, imageErrors, setImageErrors, navigateTo }) {
  const isLegalPage = ["offer", "refund", "privacy", "contacts"].includes(activePage);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070707]/88 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <button type="button" onClick={() => navigateTo("about")} className="flex items-center gap-3 text-left">
          <LogoMark
            hasError={imageErrors.logo}
            onError={() => setImageErrors((value) => ({ ...value, logo: true }))}
          />
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em]">ТІКТОК НА МІЛЬЙОН</p>
            <p className="text-xs text-zinc-400">Мінікурс Артема Косточки</p>
          </div>
        </button>

        <div className="hidden items-center gap-3 text-sm text-zinc-300 md:flex">
          <NavButton active={activePage === "program"} onClick={() => navigateTo("program")}>Програма</NavButton>
          <NavButton active={activePage === "about"} onClick={() => navigateTo("about")}>Про мене</NavButton>
          <button
            type="button"
            onClick={() => navigateTo("program", "apply")}
            className="rounded-full bg-white px-5 py-2.5 font-semibold text-black transition hover:bg-zinc-200"
          >
            Придбати
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="rounded-xl border border-white/10 p-2 md:hidden"
          aria-label="Відкрити меню"
        >
          {menuOpen ? <Icon name="x" size={20} /> : <Icon name="menu" size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#070707] md:hidden"
          >
            <div className="grid gap-1 px-5 py-4 text-sm text-zinc-300">
              <MobileMenuButton onClick={() => navigateTo("program")}>Програма</MobileMenuButton>
              <MobileMenuButton onClick={() => navigateTo("about")}>Про мене</MobileMenuButton>
              <MobileMenuButton onClick={() => navigateTo("program", "apply")}>Придбати</MobileMenuButton>
              <div className="my-2 h-px bg-white/10" />
              <MobileMenuButton onClick={() => navigateTo("offer")}>Публічна оферта</MobileMenuButton>
              <MobileMenuButton onClick={() => navigateTo("refund")}>Політика повернення</MobileMenuButton>
              <MobileMenuButton onClick={() => navigateTo("privacy")}>Конфіденційність</MobileMenuButton>
              <MobileMenuButton onClick={() => navigateTo("contacts")}>Контакти</MobileMenuButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2.5 font-semibold transition ${
        active ? "bg-white text-black" : "text-zinc-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function MobileMenuButton({ onClick, children }) {
  return (
    <button type="button" onClick={onClick} className="rounded-xl px-3 py-3 text-left transition hover:bg-white/10">
      {children}
    </button>
  );
}

function AboutPage({ imageErrors, setImageErrors, navigateTo }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-zinc-900">
            {!imageErrors.photo ? (
              <img
                src={ABOUT_PHOTO_SRC}
                alt="Артем Косточка"
                className="h-full w-full object-cover object-center"
                onError={() => setImageErrors((value) => ({ ...value, photo: true }))}
              />
            ) : (
              <div className="grid h-full place-items-center bg-zinc-900 p-8 text-center">
                <p className="text-zinc-500">Додайте фото у public/kostochka-photo-alternative.jpg</p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-zinc-500">Про мене</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight md:text-7xl">Привіт, я Артем Косточка.</h1>
          <div className="mt-7 space-y-5 text-lg leading-8 text-zinc-300">
            <p>
              Я займаюсь просуванням бізнесів та створенням вірального контенту вже більше 3 років. Я не просто розказую теорію з інтернету — я практик, який щодня працює з алгоритмами, співпрацює з великими українськими брендами і знає, як конвертувати перегляди у реальні гроші.
            </p>
            <p>
              До цього я передавав свої знання виключно в рамках особистого наставництва. Мої учні вже роблять круті результати, але індивідуальна робота коштує дорого і доступна не всім.
            </p>
            <p>
              Тому я запакував свою базу, робочі стратегії та алгоритми в один практичний курс. Мета — зробити цінну інформацію доступною для кожного, хто готовий брати телефон і реально працювати на свій результат.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            <StatCard value="500 000+" label="підписників на особистих сторінках" />
            <StatCard value="1 000 000+" label="підписників на клієнтських проєктах" />
            <StatCard value="3+ роки" label="щоденної практики з контентом і бізнесами" />
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigateTo("program")}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-black transition hover:bg-zinc-200"
            >
              Перейти до програми <Icon name="arrowRight" className="transition group-hover:translate-x-1" size={18} />
            </button>
            <button
              type="button"
              onClick={() => navigateTo("program", "apply")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-bold text-white transition hover:bg-white/10"
            >
              Придбати
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProgramPage({
  activePackage,
  selectedPackage,
  openFaq,
  imageErrors,
  formStatus,
  setActivePackage,
  setOpenFaq,
  setImageErrors,
  handlePackageSelect,
  handleSubmit,
  navigateTo,
}) {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col justify-center"
        >
          <h1 className="max-w-5xl text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">
            Мінікурс, який навчить робити перегляди.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
            11 практичних модулів без води: як утримувати увагу, адаптувати тренди, писати живі сценарії, монтувати динамічно й перетворювати перегляди у впізнаваність, довіру та заявки.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <MiniStat value="11" label="практичних модулів" />
            <MiniStat value="500k+" label="підписників автора" />
            <MiniStat value="1M+" label="на клієнтських проєктах" />
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#price"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-black transition hover:bg-zinc-200"
            >
              Обрати тариф <Icon name="arrowRight" className="transition group-hover:translate-x-1" size={18} />
            </a>
            <a
              href="#program"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-bold text-white transition hover:bg-white/10"
            >
              <Icon name="play" size={18} /> Подивитися програму
            </a>
          </div>

          
        </motion.div>

        <motion.div
          initial={{ y: 26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -left-6 top-12 hidden rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl lg:block">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-black">
                <Icon name="barChart" size={18} />
              </div>
              <div>
                <p className="text-xs text-zinc-400">Особисті сторінки</p>
                <p className="font-black">500 000+</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-4 bottom-16 hidden rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl lg:block">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-black">
                <Icon name="message" size={18} />
              </div>
              <div>
                <p className="text-xs text-zinc-400">Клієнтські проєкти</p>
                <p className="font-black">1 000 000+</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-white/10 bg-zinc-950 p-3 shadow-2xl shadow-black/40">
            <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#111114]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <LogoMark
                    small
                    hasError={imageErrors.logo}
                    onError={() => setImageErrors((value) => ({ ...value, logo: true }))}
                  />
                  <div>
                    <p className="font-bold">Артем Косточка</p>
                    <p className="text-xs text-zinc-500">creator · content strategy</p>
                  </div>
                </div>
                <Icon name="instagram" size={21} className="text-zinc-400" />
              </div>

              <div className="p-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900">
                  {!imageErrors.photo ? (
                    <img
                      src={PHOTO_SRC}
                      alt="Артем Косточка"
                      className="h-full w-full object-cover object-center"
                      onError={() => setImageErrors((value) => ({ ...value, photo: true }))}
                    />
                  ) : (
                    <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.22),transparent_24%),linear-gradient(145deg,#27272a,#09090b)] p-8 text-center">
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">photo slot</p>
                        <p className="mt-3 text-3xl font-black">Артем Косточка</p>
                      </div>
                    </div>
                  )}
                  
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <PhoneMetric value="11" label="модулів" />
                  <PhoneMetric value="2" label="тарифи" />
                  <PhoneMetric value="∞" label="доступ" />
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-semibold">Шлях учасника</p>
                  <div className="mt-3 grid gap-2 text-sm text-zinc-400">
                    <CheckLine text="Обирає тариф" />
                    <CheckLine text="Заповнює дані" />
                    <CheckLine text="Оплачує через WayForPay" />
                    <CheckLine text="Отримує Telegram-доступ" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-6 text-sm text-zinc-400 md:grid-cols-4 lg:px-8">
          <TrustItem icon={<Icon name="shield" size={18} />} text="Закритий Telegram-доступ" />
          <TrustItem icon={<Icon name="target" size={18} />} text="Фокус на контенті до результату" />
          <TrustItem icon={<Icon name="users" size={18} />} text="Для креаторів, експертів і бізнесу" />
          <TrustItem icon={<Icon name="zap" size={18} />} text="Практика після кожного уроку" />
        </div>
      </section>

      <section id="program" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-zinc-500">Програма курсу</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">11 кроків до твого результату. Без води.</h2>
          <p className="mt-5 leading-8 text-zinc-300">
            На старті є вступний урок, а далі — 11 практичних модулів із домашніми завданнями. Кожен модуль побудований навколо практики: подивився урок, виконав завдання, застосував на своєму контенті.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 md:p-6 lg:p-8">
          <div className="mb-6 flex flex-col gap-2 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Структура курсу</p>
              <h3 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Вступний урок + 11 практичних модулів</h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-zinc-400">
              Кожен блок одразу прив’язаний до практики: подивився, виконав, застосував на власному контенті.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <article
                key={module.number}
                className="rounded-[1.25rem] border border-white/10 bg-black/30 p-5 transition hover:border-white/25 hover:bg-black/40"
              >
                <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Модуль {module.number}</p>
                <h3 className="mt-4 text-xl font-black leading-tight">{module.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{module.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white p-7 text-black md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-zinc-500">Результат</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight">Після курсу в тебе має бути не натхнення, а робоча система.</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {outcomes.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-zinc-100 p-4 text-sm leading-6 text-zinc-700">
                  <Icon name="check" className="mt-0.5 shrink-0 text-black" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="price" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-zinc-500">Тарифи</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Обери свій формат навчання.</h2>
          </div>
          <p className="max-w-xl leading-8 text-zinc-300">
            БАЗА — самостійне проходження. PRO — підтримка, перевірка домашніх завдань, чат учасників і додаткові розбори.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {packages.map((pack) => {
            const isActive = activePackage === pack.id;

            return (
              <button
                key={pack.id}
                type="button"
                onClick={() => handlePackageSelect(pack.id)}
                className={`rounded-[1.7rem] border p-6 text-left transition ${
                  isActive
                    ? "border-white bg-white text-black shadow-2xl shadow-white/10"
                    : pack.recommended
                    ? "border-white/35 bg-white/[0.08] text-white hover:border-white/55 hover:bg-white/[0.11]"
                    : "border-white/10 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.07]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-zinc-500">{pack.label}</p>
                    <p className="mt-2 text-4xl font-black">{pack.name}</p>
                    <p className={`mt-3 text-sm leading-6 ${isActive ? "text-zinc-600" : "text-zinc-400"}`}>{pack.subtitle}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    {pack.recommended && (
                      <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${isActive ? "bg-black text-white" : "bg-white text-black"}`}>
                        рекомендовано
                      </span>
                    )}
                    {isActive && (
                      <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                        обрано
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-7 text-5xl font-black tracking-tight">{pack.price}</p>
                <div className="mt-6 grid gap-3">
                  {pack.features.map((feature) => (
                    <div key={feature} className={`flex gap-3 text-sm leading-6 ${isActive ? "text-zinc-700" : "text-zinc-300"}`}>
                      <Icon name="check" size={17} className="mt-1 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className={`mt-7 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black ${isActive ? "bg-black text-white" : "bg-white text-black"}`}>
                  {pack.button} <Icon name="arrowRight" size={16} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-zinc-500">FAQ</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Питання перед записом.</h2>
        </div>

        <div className="grid gap-3">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-bold"
              >
                {faq.question}
                <Icon name="chevronDown" className={`shrink-0 transition ${openFaq === index ? "rotate-180" : ""}`} size={20} />
              </button>
              <AnimatePresence initial={false}>
                {openFaq === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <p className="border-t border-white/10 px-5 py-5 leading-8 text-zinc-400">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      <section id="apply" className="mx-auto max-w-7xl px-5 py-20 pb-32 lg:px-8">
        <div className="mb-5 grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 text-zinc-300 md:grid-cols-4 md:p-6">
          <AfterPaymentStep number="01" title="Залишаєш дані" text="Обираєш тариф і заповнюєш коротку форму." />
          <AfterPaymentStep number="02" title="Оплачуєш" text="Переходиш до безпечної оплати через WayForPay." />
          <AfterPaymentStep number="03" title="Артем отримує заявку" text="Після підтвердження оплати заявка потрапляє до списку покупців." />
          <AfterPaymentStep number="04" title="Отримуєш доступ" text="Посилання з доступом до Telegram-каналу надсилається автоматично відповідно до тарифу." />
        </div>

        <div className="rounded-[2.2rem] border border-white/10 bg-white p-7 text-black md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-zinc-500">Запис на курс</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Залиш дані — і переходь до оплати.</h2>
              <p className="mt-5 max-w-2xl leading-8 text-zinc-700">
                Після оплати посилання з доступом до Telegram-каналу надішлеться автоматично відповідно до обраного тарифу.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm text-zinc-600">
                <Badge icon={<Icon name="clock" size={16} />} text="Доступ після оплати" />
                <Badge icon={<Icon name="star" size={16} />} text="БАЗА або PRO" />
                <Badge icon={<Icon name="message" size={16} />} text="Закритий Telegram" />
              </div>
              <div className="mt-7 text-sm leading-7 text-zinc-600">
                <p>Якщо виникли проблеми або запитання:</p>
                <p className="mt-1 font-black text-black">+380 50 234 61 48</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[1.7rem] bg-zinc-100 p-4">
              <div className="grid gap-3">
                <input
                  name="name"
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-zinc-500"
                  placeholder="Ім’я *"
                  autoComplete="name"
                  required
                />
                <input
                  name="phone"
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-zinc-500"
                  placeholder="Телефон *"
                  type="tel"
                  autoComplete="tel"
                  required
                />
                <input
                  name="telegram"
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-zinc-500"
                  placeholder="Telegram username, наприклад @username *"
                  autoComplete="off"
                  required
                />
                <input
                  name="email"
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-zinc-500"
                  placeholder="Email *"
                  type="email"
                  autoComplete="email"
                  required
                />
                <select
                  name="tariff"
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-zinc-500"
                  value={activePackage}
                  onChange={(event) => setActivePackage(event.target.value)}
                >
                  {packages.map((pack) => (
                    <option key={pack.id} value={pack.id}>
                      {pack.name} — {pack.price}
                    </option>
                  ))}
                </select>

                <label className="flex gap-3 px-1 text-xs leading-5 text-zinc-500">
                  <input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-black" />
                  <span>
                    Погоджуюсь з{" "}
                    <button type="button" onClick={() => navigateTo("offer")} className="font-semibold text-black underline underline-offset-2">
                      умовами публічної оферти
                    </button>
                    ,{" "}
                    <button type="button" onClick={() => navigateTo("refund")} className="font-semibold text-black underline underline-offset-2">
                      політикою повернення коштів
                    </button>
                    ,{" "}
                    <button type="button" onClick={() => navigateTo("privacy")} className="font-semibold text-black underline underline-offset-2">
                      політикою конфіденційності
                    </button>{" "}
                    та обробкою моїх контактних даних для зв’язку щодо навчання.
                  </span>
                </label>

                {formStatus.error && (
                  <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                    {formStatus.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formStatus.loading}
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 font-black text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-500"
                >
                  {formStatus.loading ? "Створюємо оплату..." : "Перейти до оплати"}
                  {!formStatus.loading && <Icon name="arrowRight" className="transition group-hover:translate-x-1" size={18} />}
                </button>

                <p className="px-1 text-xs leading-5 text-zinc-500">
                  Обраний тариф: <span className="font-black text-black">{selectedPackage.name}</span>, сума до оплати: <span className="font-black text-black">{selectedPackage.price}</span>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function LegalPage({ title, subtitle, children }) {
  return (
    <section className="mx-auto max-w-4xl px-5 py-14 lg:px-8 lg:py-20">
      <div className="rounded-[2rem] border border-white/10 bg-white p-6 text-black shadow-2xl shadow-black/30 md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-zinc-500">Документи</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 leading-7 text-zinc-600">{subtitle}</p>}
        <div className="mt-8 space-y-7 leading-8 text-zinc-800">{children}</div>
      </div>
    </section>
  );
}

function LegalSection({ title, children }) {
  return (
    <section>
      <h2 className="text-xl font-black tracking-tight text-black">{title}</h2>
      <div className="mt-3 space-y-3 text-zinc-700">{children}</div>
    </section>
  );
}

function OfferPage() {
  return (
    <LegalPage
      title="Публічна оферта"
      subtitle="Договір публічної оферти про надання інформаційних послуг."
    >
      <LegalSection title="1. Загальні положення">
        <p>
          1.1. Цей Договір є офіційною та публічною пропозицією (офертою) ФОП Кость Артем Сергійович (далі — Виконавець) для будь-якої фізичної або юридичної особи (далі — Замовник) укласти Договір на надання інформаційних послуг (доступу до онлайн-курсу) на умовах, що викладені нижче.
        </p>
        <p>
          1.2. Відповідно до ст. 642 Цивільного Кодексу України, повним і безумовним прийняттям умов даної оферти (акцептом) вважається факт здійснення Замовником оплати послуг на сайті.
        </p>
      </LegalSection>

      <LegalSection title="2. Предмет договору">
        <p>
          2.1. Виконавець зобов’язується надати Замовнику інформаційні послуги у вигляді доступу до авторських навчальних матеріалів (відеоуроки, текстові матеріали, закриті спільноти тощо), а Замовник зобов’язується оплатити ці послуги.
        </p>
        <p>2.2. Назва, зміст та вартість конкретного курсу (тарифу) вказуються на сайті в момент замовлення.</p>
      </LegalSection>

      <LegalSection title="3. Порядок надання послуг">
        <p>
          3.1. Після повної оплати послуг через платіжну систему на сайті, Замовник автоматично або протягом 24 годин отримує доступ до матеріалів (посилання на платформу, канал або групу) на вказану ним електронну пошту або месенджер.
        </p>
        <p>
          3.2. Доступ до матеріалів курсу надається Замовнику на необмежений термін (назавжди), якщо інше технічно не зумовлено роботою сторонніх сервісів (наприклад, Telegram чи хостингів).
        </p>
      </LegalSection>

      <LegalSection title="4. Вартість та порядок розрахунків">
        <p>4.1. Вартість послуг вказана на сайті та оплачується в національній валюті України (гривня).</p>
        <p>4.2. Оплата здійснюється за допомогою платіжної системи WayForPay.</p>
        <p>4.3. Послуга вважається наданою в повному обсязі з моменту надання доступу (відправки посилання) Замовнику.</p>
      </LegalSection>

      <LegalSection title="5. Права та обов’язки сторін. Захист авторських прав">
        <p>5.1. Виконавець має право змінювати зміст курсу без попередження Замовника, не зменшуючи при цьому загальний обсяг послуг.</p>
        <p>
          5.2. Замовник зобов’язується використовувати навчальні матеріали виключно для особистих потреб. Будь-яке розповсюдження, копіювання, передача доступу третім особам, організація спільного доступу (складчин), а також перепродаж чи публікація матеріалів у відкритих джерелах суворо заборонені та є порушенням авторських прав Виконавця.
        </p>
        <p>
          5.3. У разі виявлення фактів порушення Замовником п. 5.2 цього Договору (піратство, передача логінів/паролів, публікація матеріалів тощо), Виконавець має право в односторонньому порядку негайно та назавжди припинити надання послуг та заблокувати доступ Замовника до всіх матеріалів та спільнот курсу без повернення раніше сплачених коштів. Виконавець також залишає за собою право на захист своїх прав у судовому порядку.
        </p>
      </LegalSection>

      <LegalSection title="6. Порядок повернення коштів">
        <p>
          6.1. Оскільки доступ до цифрового контенту надається після оплати, кошти за надані послуги поверненню не підлягають згідно з Політикою повернення коштів, розміщеною на сайті.
        </p>
      </LegalSection>

      <LegalSection title="7. Реквізити Виконавця">
        <SellerDetails />
      </LegalSection>
    </LegalPage>
  );
}

function RefundPage() {
  return (
    <LegalPage
      title="Політика повернення коштів"
      subtitle="Умови скасування замовлення та повернення коштів за цифрові послуги."
    >
      <LegalSection title="1. Загальні положення">
        <p>
          Ця Політика визначає умови скасування замовлення та повернення коштів за цифрові послуги (доступ до онлайн-курсу), які надаються на цьому сайті.
        </p>
      </LegalSection>

      <LegalSection title="2. Надання цифрових послуг">
        <p>
          Послуга вважається наданою в повному обсязі в момент надання користувачеві доступу до навчальних матеріалів (надання посилання на закриту групу, канал або платформу з уроками) на електронну пошту або в месенджер після успішної оплати.
        </p>
      </LegalSection>

      <LegalSection title="3. Умови повернення">
        <p>
          Відповідно до Закону України «Про захист прав споживачів» та специфіки цифрових товарів, кошти за оплачений доступ до онлайн-курсу не повертаються.
        </p>
        <p>
          Отримуючи доступ до цифрового контенту, покупець втрачає право на відмову від договору та повернення коштів, оскільки цифровий товар не підлягає фізичному поверненню.
        </p>
      </LegalSection>

      <LegalSection title="4. Виняткові ситуації">
        <p>
          Якщо ви здійснили оплату, але з технічних причин (збій системи, неправильно вказана електронна пошта або месенджер) не отримали доступ до матеріалів протягом 24 годин, будь ласка, зв’яжіться зі службою підтримки за контактами, вказаними на сайті. Ми оперативно вирішимо проблему та надамо доступ.
        </p>
      </LegalSection>

      <LegalSection title="Контакти для звернень">
        <SellerDetails />
      </LegalSection>
    </LegalPage>
  );
}

function PrivacyPage() {
  return (
    <LegalPage
      title="Політика конфіденційності"
      subtitle="Як ми збираємо, використовуємо та захищаємо контактні дані користувачів сайту."
    >
      <LegalSection title="1. Які дані збираються">
        <p>
          Під час оформлення заявки на курс сайт може збирати такі контактні дані: ім’я, номер телефону, Telegram username, адресу електронної пошти, обраний тариф, дату та статус заявки або оплати.
        </p>
      </LegalSection>

      <LegalSection title="2. Для чого використовуються дані">
        <p>
          Дані використовуються для обробки заявки, проведення оплати, надання доступу до навчальних матеріалів, зв’язку з покупцем у Telegram або електронною поштою, технічної підтримки, підтвердження факту оплати та ведення обліку покупців.
        </p>
      </LegalSection>

      <LegalSection title="3. Передача даних третім сторонам">
        <p>
          Дані можуть оброблятися сервісами, необхідними для роботи сайту та надання послуг, зокрема платіжною системою WayForPay, хостингом Netlify, Google Sheets або іншими сервісами обліку заявок, а також Telegram для видачі доступу до курсу. Дані не продаються третім особам.
        </p>
      </LegalSection>

      <LegalSection title="4. Зберігання та захист даних">
        <p>
          Контактні дані зберігаються лише в обсязі, необхідному для надання послуг, підтримки користувачів, обліку оплат та виконання вимог законодавства. Доступ до даних має лише Виконавець або уповноважені особи, які забезпечують роботу курсу.
        </p>
      </LegalSection>

      <LegalSection title="5. Права користувача">
        <p>
          Користувач може звернутися до Виконавця, щоб уточнити, виправити або видалити свої контактні дані, якщо їх подальше зберігання не є необхідним для виконання договору, обліку платежів або законних інтересів Виконавця.
        </p>
      </LegalSection>

      <LegalSection title="6. Контакти з питань конфіденційності">
        <SellerDetails />
      </LegalSection>
    </LegalPage>
  );
}

function ContactsPage() {
  return (
    <LegalPage
      title="Контакти продавця"
      subtitle="Офіційна контактна інформація для звернень щодо оплати, доступу до курсу та підтримки."
    >
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
        <SellerDetails />
      </div>
      <LegalSection title="Підтримка покупців">
        <p>
          Якщо виникли проблеми з оплатою, доступом до матеріалів або запитання щодо навчання, звертайтеся за номером телефону або на email, вказані на цій сторінці.
        </p>
      </LegalSection>
      <LegalSection title="Сайт курсу">
        <p>Офіційний сайт курсу: https://kostochka.org</p>
      </LegalSection>
    </LegalPage>
  );
}

function PaymentStatusPage({ type, title, text, actionLabel, onAction }) {
  const isSuccess = type === "success";

  return (
    <section className="mx-auto max-w-4xl px-5 py-14 lg:px-8 lg:py-20">
      <div className="rounded-[2rem] border border-white/10 bg-white p-6 text-black shadow-2xl shadow-black/30 md:p-10">
        <div className={`grid h-14 w-14 place-items-center rounded-2xl ${isSuccess ? "bg-black text-white" : "bg-zinc-200 text-black"}`}>
          <Icon name={isSuccess ? "check" : "x"} size={26} />
        </div>
        <h1 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl leading-8 text-zinc-700">{text}</p>
        <div className="mt-8 grid gap-3 rounded-2xl bg-zinc-100 p-5 text-sm leading-6 text-zinc-700 md:grid-cols-3">
          <div>
            <p className="font-black text-black">1. Заявка</p>
            <p className="mt-1">Дані покупця фіксуються після оформлення.</p>
          </div>
          <div>
            <p className="font-black text-black">2. Перевірка</p>
            <p className="mt-1">Оплата підтверджується через WayForPay.</p>
          </div>
          <div>
            <p className="font-black text-black">3. Доступ</p>
            <p className="mt-1">Покупець отримує посилання з доступом відповідно до тарифу.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onAction}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 font-black text-white transition hover:bg-zinc-800"
        >
          {actionLabel} <Icon name="arrowRight" size={18} />
        </button>
        <p className="mt-6 text-sm leading-7 text-zinc-600">
          Якщо виникли проблеми або запитання: <span className="font-black text-black">+380 50 234 61 48</span>
        </p>
      </div>
    </section>
  );
}

function PaymentSuccessPage({ navigateTo }) {
  return (
    <PaymentStatusPage
      type="success"
      title="Оплату прийнято."
      text="Ми отримали вашу заявку. посилання з доступом до Telegram-каналу буде надіслано автоматично відповідно до обраного тарифу."
      actionLabel="Повернутися до програми"
      onAction={() => navigateTo("program")}
    />
  );
}

function PaymentDeclinedPage({ navigateTo }) {
  return (
    <PaymentStatusPage
      type="declined"
      title="Оплату не завершено."
      text="Платіж не був підтверджений. Спробуйте ще раз або зверніться за номером підтримки, якщо оплата була списана, але доступ не надійшов."
      actionLabel="Спробувати ще раз"
      onAction={() => navigateTo("program", "apply")}
    />
  );
}

function SellerDetails() {
  return (
    <div className="space-y-2 text-zinc-700">
      <p><span className="font-bold text-black">{seller.name}</span></p>
      <p>ІПН: {seller.taxId}</p>
      <p>Адреса: {seller.address}</p>
      <p>Email: <a className="font-semibold text-black underline underline-offset-2" href={`mailto:${seller.email}`}>{seller.email}</a></p>
      <p>Тел: <a className="font-semibold text-black underline underline-offset-2" href="tel:+380502346148">{seller.phone}</a></p>
    </div>
  );
}

function AfterPaymentStep({ number, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">{number}</p>
      <h3 className="mt-3 font-black text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
    </div>
  );
}

function MobileStickyCta({ navigateTo }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#070707]/92 px-4 py-3 backdrop-blur-xl md:hidden">
      <button
        type="button"
        onClick={() => navigateTo("program", "price")}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-black shadow-2xl shadow-black/40"
      >
        Придбати — від 1499 грн <Icon name="arrowRight" size={16} />
      </button>
    </div>
  );
}

function Footer({ imageErrors, setImageErrors, navigateTo }) {
  return (
    <footer className="relative z-10 border-t border-white/10 px-5 py-8 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 text-sm text-zinc-500 md:grid-cols-[1fr_auto] md:items-start">
        <div className="flex items-center gap-3">
          <LogoMark
            small
            hasError={imageErrors.logo}
            onError={() => setImageErrors((value) => ({ ...value, logo: true }))}
          />
          <div>
            <p>ТІКТОК НА МІЛЬЙОН © 2026. Мінікурс Артема Косточки.</p>
            <p className="mt-1">{seller.name}. ІПН: {seller.taxId}.</p>
          </div>
        </div>

        <div className="grid gap-3 md:justify-items-end">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <FooterButton onClick={() => navigateTo("about")}>Про мене</FooterButton>
            <FooterButton onClick={() => navigateTo("program")}>Програма</FooterButton>
            <FooterButton onClick={() => navigateTo("program", "apply")}>Придбати</FooterButton>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
            <FooterButton onClick={() => navigateTo("offer")}>Оферта</FooterButton>
            <FooterButton onClick={() => navigateTo("refund")}>Повернення</FooterButton>
            <FooterButton onClick={() => navigateTo("privacy")}>Конфіденційність</FooterButton>
            <FooterButton onClick={() => navigateTo("contacts")}>Контакти</FooterButton>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterButton({ onClick, children }) {
  return (
    <button type="button" onClick={onClick} className="transition hover:text-white">
      {children}
    </button>
  );
}

function LogoMark({ small = false, hasError, onError }) {
  const size = small ? "h-10 w-10" : "h-11 w-11";

  if (!hasError) {
    return (
      <div className={`grid ${size} shrink-0 place-items-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-white/10`}>
        <img src={LOGO_SRC} alt="Логотип курсу" className="h-full w-full object-cover" onError={onError} />
      </div>
    );
  }

  return (
    <div className={`grid ${size} shrink-0 place-items-center rounded-2xl bg-white text-lg font-black text-black shadow-lg shadow-white/10`}>
      AK
    </div>
  );
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-[-18rem] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-[-18rem] left-[-14rem] h-[36rem] w-[36rem] rounded-full bg-zinc-700/20 blur-3xl" />
      <div className="absolute bottom-20 right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-white/[0.07] blur-3xl" />
    </div>
  );
}

function MiniStat({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-sm text-zinc-500">{label}</p>
    </div>
  );
}

function PhoneMetric({ value, label }) {
  return (
    <div className="rounded-2xl bg-white/[0.05] p-3">
      <p className="font-black">{value}</p>
      <p className="text-xs text-zinc-500">{label}</p>
    </div>
  );
}

function CheckLine({ text }) {
  return (
    <div className="flex items-center gap-2">
      <Icon name="check" size={15} className="text-white" />
      <span>{text}</span>
    </div>
  );
}

function TrustItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <span className="text-white">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{label}</p>
    </div>
  );
}

function Badge({ icon, text }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2">
      {icon}
      {text}
    </span>
  );
}

function Icon({ name, size = 20, className = "" }) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": "true",
  };

  const icons = {
    arrowRight: (
      <svg {...commonProps}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
    barChart: (
      <svg {...commonProps}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 16v-5" />
        <path d="M12 16V8" />
        <path d="M16 16v-9" />
      </svg>
    ),
    check: (
      <svg {...commonProps}>
        <path d="m20 6-11 11-5-5" />
      </svg>
    ),
    chevronDown: (
      <svg {...commonProps}>
        <path d="m6 9 6 6 6-6" />
      </svg>
    ),
    clock: (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    instagram: (
      <svg {...commonProps}>
        <rect width="18" height="18" x="3" y="3" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </svg>
    ),
    menu: (
      <svg {...commonProps}>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </svg>
    ),
    message: (
      <svg {...commonProps}>
        <path d="M21 12a8 8 0 0 1-8 8H7l-4 3 1.4-5.2A8 8 0 1 1 21 12Z" />
      </svg>
    ),
    play: (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="m10 8 6 4-6 4V8Z" />
      </svg>
    ),
    shield: (
      <svg {...commonProps}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    sparkles: (
      <svg {...commonProps}>
        <path d="M12 3 9.8 8.8 4 11l5.8 2.2L12 19l2.2-5.8L20 11l-5.8-2.2L12 3Z" />
        <path d="M5 3v4" />
        <path d="M3 5h4" />
        <path d="M19 17v4" />
        <path d="M17 19h4" />
      </svg>
    ),
    star: (
      <svg {...commonProps}>
        <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
      </svg>
    ),
    target: (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    ),
    users: (
      <svg {...commonProps}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    x: (
      <svg {...commonProps}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    ),
    zap: (
      <svg {...commonProps}>
        <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" />
      </svg>
    ),
  };

  return icons[name] ?? icons.sparkles;
}
