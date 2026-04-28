import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const modules = [
  {
    number: "01",
    title: "Упаковка особистого бренду",
    description:
      "Позиціонування, візуальна подача, перше враження, профіль Instagram і Telegram як вітрина експерта або бізнесу.",
  },
  {
    number: "02",
    title: "Контент, який набирає перегляди",
    description:
      "Як знаходити теми, писати хуки, будувати серії постів і Reels, робити контент зрозумілим, живим і регулярним.",
  },
  {
    number: "03",
    title: "Telegram-канал як медіаактив",
    description:
      "Структура каналу, рубрики, прогрів, утримання аудиторії, аналітика постів і перехід від переглядів до заявок.",
  },
  {
    number: "04",
    title: "Instagram + TikTok як джерело трафіку",
    description:
      "Як переводити людей із короткого відео в Telegram, на консультацію, в магазин, на курс або в особисті повідомлення.",
  },
  {
    number: "05",
    title: "Реклама та колаборації",
    description:
      "Як обирати майданчики, домовлятися про рекламу, рахувати ефективність і не зливати бюджет на випадкові інтеграції.",
  },
  {
    number: "06",
    title: "Монетизація аудиторії",
    description:
      "Як перетворити охоплення в продукт, послугу, консультацію, локальний бізнес, партнерства або стабільний потік заявок.",
  },
];

const outcomes = [
  "Зрозумієш, що саме публікувати і для кого",
  "Навчишся оформляти профіль так, щоб люди довіряли",
  "Побудуєш Telegram-канал не просто “для постів”, а для продажів",
  "Навчишся переводити перегляди з Instagram/TikTok у заявки",
  "Зрозумієш базову аналітику, рекламу і колаборації",
  "Отримаєш систему, яку можна повторювати щотижня",
];

const packages = [
  {
    name: "Старт",
    price: "2 900 грн",
    subtitle: "Для тих, хто хоче самостійно розібратися",
    features: ["Доступ до уроків", "Чеклисти", "Домашні завдання", "Доступ 3 місяці"],
    highlighted: false,
  },
  {
    name: "Практика",
    price: "4 900 грн",
    subtitle: "Оптимальний формат для запуску або перезапуску",
    features: ["Все зі Старту", "Закритий Telegram-чат", "Розбір профілю", "2 групові ефіри", "Доступ 6 місяців"],
    highlighted: true,
  },
  {
    name: "Особистий супровід",
    price: "9 900 грн",
    subtitle: "Для тих, кому потрібен персональний розбір",
    features: ["Все з Практики", "Особиста консультація", "Аудит Telegram/Instagram", "План просування на 30 днів"],
    highlighted: false,
  },
];

const faqs = [
  {
    question: "Це курс тільки для блогерів?",
    answer:
      "Ні. Він підходить для локального бізнесу, експертів, власників Telegram-каналів, початківців у контенті та людей, які хочуть просувати послуги через Instagram, TikTok і Telegram.",
  },
  {
    question: "Потрібна велика аудиторія на старті?",
    answer:
      "Ні. Курс якраз пояснює, як почати з маленької аудиторії, правильно її зібрати, утримувати і поступово перетворювати увагу в довіру та заявки.",
  },
  {
    question: "Чи буде реклама в курсі?",
    answer:
      "Так, але без ілюзій. Реклама розглядається як інструмент, який працює тільки тоді, коли вже є нормальна упаковка, зрозуміла пропозиція і контент, який не соромно показувати новим людям.",
  },
  {
    question: "Скільки часу потрібно на навчання?",
    answer:
      "Орієнтовно 3–5 годин на тиждень: уроки, завдання, аналіз свого профілю і впровадження змін. Головне — не просто дивитися, а робити.",
  },
];

const prototypeTests = [
  {
    name: "course has exactly six modules",
    pass: modules.length === 6,
  },
  {
    name: "recommended package exists",
    pass: packages.some((item) => item.name === "Практика" && item.highlighted),
  },
  {
    name: "application flow has at least one FAQ item",
    pass: faqs.length > 0 && faqs.every((item) => item.question && item.answer),
  },
  {
    name: "every package has visible features",
    pass: packages.every((item) => Array.isArray(item.features) && item.features.length > 0),
  },
];

export default function CourseLandingPrototype() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePackage, setActivePackage] = useState("Практика");
  const [openFaq, setOpenFaq] = useState(0);

  const selectedPackage = useMemo(
    () => packages.find((item) => item.name === activePackage) ?? packages[1],
    [activePackage]
  );

  const testsPassed = prototypeTests.every((test) => test.pass);

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white selection:bg-white selection:text-black">
      <BackgroundGlow />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0d]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-lg font-black text-black shadow-lg shadow-white/10">
              К
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em]">Косточка</p>
              <p className="text-xs text-zinc-400">media course</p>
            </div>
          </a>

          <div className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">
            <a className="transition hover:text-white" href="#program">Програма</a>
            <a className="transition hover:text-white" href="#for-whom">Для кого</a>
            <a className="transition hover:text-white" href="#price">Тарифи</a>
            <a className="transition hover:text-white" href="#faq">FAQ</a>
            <a className="rounded-full bg-white px-5 py-2.5 font-semibold text-black transition hover:bg-zinc-200" href="#apply">
              Залишити заявку
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-xl border border-white/10 p-2 md:hidden"
            aria-label="Open menu"
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
              className="overflow-hidden border-t border-white/10 bg-[#0b0b0d] md:hidden"
            >
              <div className="grid gap-1 px-5 py-4 text-sm text-zinc-300">
                {[
                  ["Програма", "#program"],
                  ["Для кого", "#for-whom"],
                  ["Тарифи", "#price"],
                  ["FAQ", "#faq"],
                  ["Залишити заявку", "#apply"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-3 transition hover:bg-white/10"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="top" className="relative z-10">
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-zinc-300">
              <Icon name="sparkles" size={16} /> Практичний курс для Telegram, Instagram і TikTok
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Просування без хаосу: від контенту до заявок.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
              Навчися упаковувати профіль, набирати увагу через короткий контент, вести Telegram-канал і перетворювати перегляди в реальні заявки для себе, бренду або локального бізнесу.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <MiniStat value="6" label="модулів" />
              <MiniStat value="30" label="днів практики" />
              <MiniStat value="0→1" label="система запуску" />
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#apply"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-black transition hover:bg-zinc-200"
              >
                Хочу на курс <Icon name="arrowRight" className="transition group-hover:translate-x-1" size={18} />
              </a>
              <a
                href="#program"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-bold text-white transition hover:bg-white/10"
              >
                <Icon name="play" size={18} /> Подивитися програму
              </a>
            </div>

            <p className="mt-5 text-sm text-zinc-500">
              Прототип сайту. Тексти, ціни, дата старту і формат легко замінюються перед реальним запуском.
            </p>
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
                  <p className="text-xs text-zinc-400">Охоплення</p>
                  <p className="font-black">+184%</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-16 hidden rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl lg:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-black">
                  <Icon name="message" size={18} />
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Заявки</p>
                  <p className="font-black">23 за тиждень</p>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-sm rounded-[2.2rem] border border-white/10 bg-zinc-950 p-3 shadow-2xl shadow-black/40">
              <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#111114]">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-white font-black text-black">К</div>
                    <div>
                      <p className="font-bold">Косточка</p>
                      <p className="text-xs text-zinc-500">creator · Lutsk</p>
                    </div>
                  </div>
                  <Icon name="instagram" size={21} className="text-zinc-400" />
                </div>

                <div className="p-5">
                  <div className="aspect-[4/5] rounded-[1.5rem] bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.35),transparent_20%),linear-gradient(145deg,#27272a,#09090b)] p-5">
                    <div className="flex h-full flex-col justify-end">
                      <div className="rounded-2xl bg-black/50 p-4 backdrop-blur">
                        <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">new lesson</p>
                        <p className="mt-2 text-2xl font-black leading-tight">Як вести Telegram, щоб люди чекали твої пости?</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                    <PhoneMetric value="18.4k" label="views" />
                    <PhoneMetric value="721" label="saves" />
                    <PhoneMetric value="89" label="DMs" />
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm font-semibold">Система курсу</p>
                    <div className="mt-3 grid gap-2 text-sm text-zinc-400">
                      <CheckLine text="Упаковка" />
                      <CheckLine text="Контент" />
                      <CheckLine text="Трафік" />
                      <CheckLine text="Заявки" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 py-6 text-sm text-zinc-400 md:grid-cols-4 lg:px-8">
            <TrustItem icon={<Icon name="shield" size={18} />} text="Без “чарівних схем” і накруток" />
            <TrustItem icon={<Icon name="target" size={18} />} text="Фокус на заявках і довірі" />
            <TrustItem icon={<Icon name="users" size={18} />} text="Для експертів і локального бізнесу" />
            <TrustItem icon={<Icon name="zap" size={18} />} text="Практика з першого тижня" />
          </div>
        </section>

        <section id="for-whom" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-zinc-500">Для кого</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Курс для тих, хто хоче не просто постити, а рости.</h2>
              <p className="mt-5 leading-8 text-zinc-300">
                Ідея сторінки: швидко пояснити, кому курс потрібен, який результат він дає, чому Косточці можна довіряти і що треба зробити далі.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <AudienceCard title="Початківцям" text="Якщо є бажання вести Telegram або Instagram, але немає системи, рубрик і зрозумілого плану." />
              <AudienceCard title="Експертам" text="Якщо є знання або послуга, але профіль не продає, а контент виходить нерегулярно." />
              <AudienceCard title="Локальному бізнесу" text="Якщо треба приводити клієнтів з міста, району або області через соцмережі." />
              <AudienceCard title="Креаторам" text="Якщо вже є перегляди, але немає стабільної монетизації, пропозиції або воронки." />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white p-7 text-black md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-zinc-500">Результат</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight">Після курсу в тебе має бути не “натхнення”, а робоча система.</h2>
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

        <section id="program" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-zinc-500">Програма</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">6 модулів: від упаковки до монетизації.</h2>
            <p className="mt-5 leading-8 text-zinc-300">
              Цей блок можна легко адаптувати під реальну програму Косточки: додати уроки, домашні завдання, ефіри, кейси, бонуси та дедлайни.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module, index) => (
              <motion.div
                key={module.number}
                initial={{ y: 16, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/25 hover:bg-white/[0.07]"
              >
                <p className="text-sm font-black text-zinc-500">{module.number}</p>
                <h3 className="mt-5 text-2xl font-black">{module.title}</h3>
                <p className="mt-4 leading-7 text-zinc-400">{module.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="price" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-zinc-500">Тарифи</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Три формати участі.</h2>
            </div>
            <p className="max-w-xl leading-8 text-zinc-300">
              Ціни в прототипі умовні. Їх можна замінити після того, як буде зрозумілий формат курсу, кількість уроків і рівень супроводу.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map((pack) => (
              <button
                key={pack.name}
                type="button"
                onClick={() => setActivePackage(pack.name)}
                className={`rounded-[1.7rem] border p-6 text-left transition ${
                  pack.highlighted
                    ? "border-white bg-white text-black shadow-2xl shadow-white/10"
                    : activePackage === pack.name
                    ? "border-white/40 bg-white/[0.08] text-white"
                    : "border-white/10 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.07]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-black">{pack.name}</p>
                    <p className={`mt-2 text-sm leading-6 ${pack.highlighted ? "text-zinc-600" : "text-zinc-400"}`}>{pack.subtitle}</p>
                  </div>
                  {pack.highlighted && (
                    <span className="rounded-full bg-black px-3 py-1 text-xs font-black uppercase tracking-wide text-white">топ</span>
                  )}
                </div>
                <p className="mt-6 text-4xl font-black tracking-tight">{pack.price}</p>
                <div className="mt-6 grid gap-3">
                  {pack.features.map((feature) => (
                    <div key={feature} className={`flex gap-3 text-sm ${pack.highlighted ? "text-zinc-700" : "text-zinc-300"}`}>
                      <Icon name="check" size={17} className="mt-0.5 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-zinc-300">
            Обраний тариф: <span className="font-bold text-white">{selectedPackage.name}</span>. У реальній версії кнопка нижче може вести в Telegram, WayForPay/Fondy/LiqPay, Google Form або CRM.
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
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p className="border-t border-white/10 px-5 py-5 leading-8 text-zinc-400">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        <section id="apply" className="mx-auto max-w-7xl px-5 py-20 pb-28 lg:px-8">
          <div className="rounded-[2.2rem] border border-white/10 bg-white p-7 text-black md:p-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-zinc-500">Запис на курс</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Залиш заявку — і ми напишемо тобі в Telegram.</h2>
                <p className="mt-5 max-w-2xl leading-8 text-zinc-700">
                  У прототипі це статична форма. У реальному сайті її можна підключити до Telegram-бота, Google Sheets, CRM або форми заявки.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 text-sm text-zinc-600">
                  <Badge icon={<Icon name="clock" size={16} />} text="Запуск найближчим часом" />
                  <Badge icon={<Icon name="star" size={16} />} text="Місця в потоці обмежені" />
                  <Badge icon={<Icon name="message" size={16} />} text="Зв’язок через Telegram" />
                </div>
              </div>

              <form className="rounded-[1.7rem] bg-zinc-100 p-4">
                <div className="grid gap-3">
                  <input className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-zinc-500" placeholder="Ім’я" />
                  <input className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-zinc-500" placeholder="Telegram / Instagram" />
                  <select className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-zinc-500" defaultValue="Практика">
                    {packages.map((pack) => (
                      <option key={pack.name}>{pack.name}</option>
                    ))}
                  </select>
                  <textarea className="min-h-28 rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-zinc-500" placeholder="Що хочеш просувати? Telegram, Instagram, бізнес, особистий бренд?" />
                  <button type="button" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 font-black text-white transition hover:bg-zinc-800">
                    Надіслати заявку <Icon name="arrowRight" className="transition group-hover:translate-x-1" size={18} />
                  </button>
                  <p className="px-1 text-xs leading-5 text-zinc-500">
                    Натискаючи кнопку, користувач залишає контакт для зв’язку щодо курсу. Юридичний текст можна додати окремо.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section aria-label="Prototype checks" className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
          <details className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-zinc-400">
            <summary className="cursor-pointer font-bold text-zinc-300">
              Prototype checks: {testsPassed ? "passed" : "needs attention"}
            </summary>
            <div className="mt-4 grid gap-2">
              {prototypeTests.map((test) => (
                <div key={test.name} className="flex items-center gap-2">
                  <span className={test.pass ? "text-emerald-400" : "text-red-400"}>{test.pass ? "✓" : "×"}</span>
                  <span>{test.name}</span>
                </div>
              ))}
            </div>
          </details>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>Косточка.Media © 2026. Прототип лендингу курсу.</p>
          <div className="flex gap-5">
            <a href="#program" className="transition hover:text-white">Програма</a>
            <a href="#price" className="transition hover:text-white">Тарифи</a>
            <a href="#apply" className="transition hover:text-white">Заявка</a>
          </div>
        </div>
      </footer>
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

function AudienceCard({ title, text }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-4 leading-7 text-zinc-400">{text}</p>
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
