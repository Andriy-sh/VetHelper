"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const faqs: FAQItem[] = [
    {
      question: "Як записатися на консультацію до ветеринара?",
      answer:
        "Щоб записатися на консультацію, виберіть клініку через нашу платформу та виберіть доступний час для прийому.",
    },
    {
      question: "Яка вартість консультацій?",
      answer:
        "Вартість консультацій залежить від клініки та спеціаліста. Ви можете переглянути ціни при виборі клініки.",
    },
    {
      question: "Чи є можливість відеоконсультацій?",
      answer:
        "Так, ми надаємо можливість відеоконсультацій з ветеринарами через наш веб-сайт або мобільний додаток.",
    },
    {
      question: "Як додати свою тварину в профіль?",
      answer:
        "Щоб додати тварину, перейдіть у ваш профіль та натисніть 'Додати тварину', після чого заповніть необхідні дані.",
    },
    {
      question: "Як відслідковувати історію здоров'я моєї тварини?",
      answer:
        "У профілі кожної тварини ви можете переглядати її медичну історію, включаючи вакцинації, відвідування ветеринара та інші важливі записи.",
    },
    {
      question: "Чи можна отримати консультацію по телефону?",
      answer:
        "Зараз ми пропонуємо консультації тільки через відео або чат. Телефонні консультації наразі не доступні.",
    },
    {
      question: "Як змінити своє місто на платформі?",
      answer:
        "Для зміни міста перейдіть у налаштування профілю та виберіть нове місто для отримання відповідних клінік.",
    },
    {
      question: "Чи є гарантія на лікування?",
      answer:
        "Гарантія на лікування надається окремими клініками, залежно від послуг. Рекомендуємо уточнювати це при записі на прийом.",
    },
  ];

  const [showAll, setShowAll] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Часто задавані питання
        </h1>
        <p className="text-lg text-gray-600">
          Швидкі відповіді на питання, які можуть у вас виникнути.
        </p>
      </div>

      <div className="space-y-8">
        {faqs.slice(0, showAll ? faqs.length : 5).map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {faq.question}
            </h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"
        >
          {showAll ? "Показати менше" : "Показати більше"}
        </button>
      </div>
    </div>
  );
}
