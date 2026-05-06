import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_SRC = "/kostochka-logo.jpg";
const PHOTO_SRC = "/kostochka-photo.jpg";

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
      "Секрети динаміки: як вирізати паузи, робити вкиди та утримувати увагу звуковими акцентами.",
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
      "Як продавати свої товари без прямого впарювання і вітрини.",
  },
  {
    number: "08",
    title: "Особистий бренд",
    description:
      "Як знайти свій якір і чому люди будуть купувати саме у тебе.",
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
    subtitle: "Ідеально для тих, хто має дисципліну та звик рухатися у своєму темпі.",
    button: "Обрати тариф «База»",
    features: [
      "Доступ до всіх 11 практичних модулів",
      "Доступ до закритого Telegram-каналу з відеоуроками",
      "Домашні завдання після кожного уроку для самостійного виконання",
      "Доступ до матеріалів назавжди",
    ],
    highlighted: false,
  },
  {
    id: "pro",
    name: "PRO",
    label: "З моєю підтримкою",
    price: "3499 грн",
    subtitle: "Для тих, хто хоче максимальний результат, особистий фідбек та сильне оточення.",
    button: "Обрати тариф «PRO»",
    features: [
      "Усі матеріали тарифу «База»",
      "Особиста перевірка кожної домашки з поясненням помилок",
      "Закритий чат учасників для розборів, нетворкінгу та підтримки",
      "Прямий зворотний зв’язок по ідеях, сценаріях і подачі",
      "Додаткові фішки, інсайди та розбори поза основною програмою",
      "Іменний сертифікат PRO Content Creation Academy після виконання практичних завдань",
    ],
    highlighted: true,
  },
];

const faqs = [
  {
    question: "Це курс тільки для блогерів?",
    answer:
      "Ні. Курс підходить для локального бізнесу, експертів, власників Telegram-каналів, початківців у контенті та людей, які хочуть просувати себе або свої послуги через Instagram, TikTok і Telegram.",
  },
  {
    question: "Потрібна велика аудиторія на старті?",
    answer:
      "Ні. Курс побудований так, щоб ти міг стартувати навіть із маленькою аудиторією: зрозуміти свою подачу, створити систему контенту й поступово перетворювати увагу в довіру та заявки.",
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
      "Якщо виникли проблеми або запитання, звертайся за номером: +380 50 234 61 48.",
  },
];

const prototypeTests = [
  { name: "course has exactly eleven modules", pass: modules.length === 11 },
  { name: "there are exactly two tariffs", pass: packages.length === 2 },
  { name: "base tariff price is defined", pass: packages.find((item) => item.id === "base")?.price === "1499 грн" },
  { name: "pro tariff price is defined", pass: packages.find((item) => item.id === "pro")?.price === "3499 грн" },
  { name: "FAQ contains support contact", pass: faqs.some((item) => item.answer.includes("+380 50 234 61 48")) },
];

export default function CourseLandingPrototype() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePackage, setActivePackage] = useState("pro");
  const [openFaq, setOpenFaq] = useState(0);
  const [imageErrors, setImageErrors] = useState({ logo: false, photo: false });

  const selectedPackage = useMemo(
    () => packages.find((item) => item.id === activePackage) ?? packages[1],
    [activePackage]
  );

  const testsPassed = prototypeTests.every((test) => test.pass);

  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-white selection:text-black">
      <BackgroundGlow />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070707]/82 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <LogoMark hasError={imageErrors.logo} onError={() => setImageErrors((value) => ({ ...value, logo: true }))} />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em]">AK Content</p>
              <p className="text-xs text-zinc-400">PRO Content Creation Academy</p>
            </div>
          </a>

          <div className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">
            <a className="transition hover:text-white" href="#about">Про автора</a>
            <a className="transition hover:text-white" href="#program">Програма</a>
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
              className="overflow-hidden border-t border-white/10 bg-[#070707] md:hidden"
            >
              <div className="grid gap-1 px-5 py-4 text-sm text-zinc-300">
                {[
                  ["Про автора", "#about"],
                  ["Програма", "#program"],
                  ["Тарифи", "#price"],
                  ["FAQ", "#faq"],
                  ["Заявка", "#apply"],
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
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-zinc-300">
              <Icon name="sparkles" size={16} /> TikTok, Instagram і Telegram для результату, а не просто для постингу
            </div>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-tight md:text-7xl">
              Мінікурс, який навчить робити контент до заявок.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
              11 практичних модулів без води: утримання уваги, тренди, сценарії, CapCut, техніка, алгоритми, продажі, особистий бренд, робота з помилками та брендами.
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

            <p className="mt-5 text-sm text-zinc-500">
              Після оплати доступ відкривається через закритий Telegram-канал відповідно до обраного тарифу.
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
                    <LogoMark small hasError={imageErrors.logo} onError={() => setImageErrors((value) => ({ ...value, logo: true }))} />
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
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">PRO Content Creation Academy</p>
                      <p className="mt-2 text-2xl font-black leading-tight">Контент, який утримує увагу і приводить людей.</p>
                    </div>
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

        <section id="about" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-zinc-900">
                {!imageErrors.photo ? (
                  <img
                    src={PHOTO_SRC}
                    alt="Артем Косточка"
                    className="h-full w-full object-cover object-center"
                    onError={() => setImageErrors((value) => ({ ...value, photo: true }))}
                  />
                ) : (
                  <div className="grid h-full place-items-center bg-zinc-900 p-8 text-center">
                    <p className="text-zinc-500">Додайте фото у public/kostochka-photo.jpg</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-zinc-500">Про автора</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Привіт, я Артем Косточка.</h2>
              <div className="mt-6 space-y-5 leading-8 text-zinc-300">
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

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <StatCard value="500 000+" label="підписників на особистих сторінках" />
                <StatCard value="1 000 000+" label="підписників на клієнтських проєктах" />
                <StatCard value="3+ роки" label="щоденної практики з контентом і бізнесами" />
              </div>
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

        <section id="program" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-zinc-500">Програма курсу</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">11 кроків до твого результату. Без води.</h2>
            <p className="mt-5 leading-8 text-zinc-300">
              Кожен модуль побудований навколо практики: подивився урок, виконав завдання, застосував на своєму контенті.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module, index) => (
              <motion.div
                key={module.number}
                initial={{ y: 16, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.035 }}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/25 hover:bg-white/[0.07]"
              >
                <p className="text-sm font-black text-zinc-500">Модуль {module.number}</p>
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
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Обери свій формат навчання.</h2>
            </div>
            <p className="max-w-xl leading-8 text-zinc-300">
              БАЗА — самостійне проходження. PRO — підтримка, перевірка домашніх завдань, чат учасників і додаткові розбори.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {packages.map((pack) => (
              <button
                key={pack.id}
                type="button"
                onClick={() => setActivePackage(pack.id)}
                className={`rounded-[1.7rem] border p-6 text-left transition ${
                  pack.highlighted
                    ? "border-white bg-white text-black shadow-2xl shadow-white/10"
                    : activePackage === pack.id
                    ? "border-white/40 bg-white/[0.08] text-white"
                    : "border-white/10 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.07]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.22em] opacity-60">{pack.label}</p>
                    <p className="mt-2 text-4xl font-black">{pack.name}</p>
                    <p className={`mt-3 text-sm leading-6 ${pack.highlighted ? "text-zinc-600" : "text-zinc-400"}`}>{pack.subtitle}</p>
                  </div>
                  {pack.highlighted && (
                    <span className="rounded-full bg-black px-3 py-1 text-xs font-black uppercase tracking-wide text-white">рекомендовано</span>
                  )}
                </div>
                <p className="mt-7 text-5xl font-black tracking-tight">{pack.price}</p>
                <div className="mt-6 grid gap-3">
                  {pack.features.map((feature) => (
                    <div key={feature} className={`flex gap-3 text-sm leading-6 ${pack.highlighted ? "text-zinc-700" : "text-zinc-300"}`}>
                      <Icon name="check" size={17} className="mt-1 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className={`mt-7 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black ${pack.highlighted ? "bg-black text-white" : "bg-white text-black"}`}>
                  {pack.button} <Icon name="arrowRight" size={16} />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-zinc-300">
            Обраний тариф: <span className="font-bold text-white">{selectedPackage.name}</span>. У фінальній версії кнопка оплати вестиме на WayForPay, а після підтвердження оплати покупець отримає Telegram-доступ.
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
                <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Залиш дані — і переходь до оплати.</h2>
                <p className="mt-5 max-w-2xl leading-8 text-zinc-700">
                  У фінальній версії після успішної оплати через WayForPay покупець буде записаний у Google Sheets, а доступ у Telegram буде видано відповідно до тарифу.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 text-sm text-zinc-600">
                  <Badge icon={<Icon name="clock" size={16} />} text="Доступ після оплати" />
                  <Badge icon={<Icon name="star" size={16} />} text="БАЗА або PRO" />
                  <Badge icon={<Icon name="message" size={16} />} text="Закритий Telegram" />
                </div>
                <p className="mt-7 text-sm leading-7 text-zinc-600">
                  Якщо виникли проблеми або запитання щодо оплати чи доступу до курсу: <span className="font-black text-black">+380 50 234 61 48</span>
                </p>
              </div>

              <form className="rounded-[1.7rem] bg-zinc-100 p-4">
                <div className="grid gap-3">
                  <input className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-zinc-500" placeholder="Ім’я *" required />
                  <input className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-zinc-500" placeholder="Телефон *" required />
                  <input className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-zinc-500" placeholder="Telegram username *" required />
                  <input className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-zinc-500" placeholder="Email *" type="email" required />
                  <select
                    className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-zinc-500"
                    value={activePackage}
                    onChange={(event) => setActivePackage(event.target.value)}
                  >
                    {packages.map((pack) => (
                      <option key={pack.id} value={pack.id}>{pack.name} — {pack.price}</option>
                    ))}
                  </select>
                  <button type="button" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 font-black text-white transition hover:bg-zinc-800">
                    Перейти до оплати <Icon name="arrowRight" className="transition group-hover:translate-x-1" size={18} />
                  </button>
                  <p className="px-1 text-xs leading-5 text-zinc-500">
                    Це демо-форма. У фінальній версії вона буде підключена до WayForPay, Google Sheets і Telegram-доступу.
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
          <div className="flex items-center gap-3">
            <LogoMark small hasError={imageErrors.logo} onError={() => setImageErrors((value) => ({ ...value, logo: true }))} />
            <p>AK Content © 2026. PRO Content Creation Academy.</p>
          </div>
          <div className="flex gap-5">
            <a href="#about" className="transition hover:text-white">Автор</a>
            <a href="#program" className="transition hover:text-white">Програма</a>
            <a href="#price" className="transition hover:text-white">Тарифи</a>
            <a href="#apply" className="transition hover:text-white">Оплата</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LogoMark({ small = false, hasError, onError }) {
  const size = small ? "h-10 w-10" : "h-11 w-11";

  if (!hasError) {
    return (
      <div className={`grid ${size} shrink-0 place-items-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-white/10`}>
        <img src={LOGO_SRC} alt="AK Content logo" className="h-full w-full object-cover" onError={onError} />
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
