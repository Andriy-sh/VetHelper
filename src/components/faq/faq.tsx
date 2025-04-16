"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Faq() {
  interface FAQItem {
    question: string;
    answer: string;
  }

  const [showAll, setShowAll] = useState(false);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen bg-gradient-to-b from-white to-slate-200 max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-center mb-12"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Часто задавані питання
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-lg text-gray-600"
        >
          Швидкі відповіді на питання, які можуть у вас виникнути.
        </motion.p>
      </motion.div>

      <AnimatePresence>
        <div className="space-y-8">
          {faqs.slice(0, showAll ? faqs.length : 5).map((faq, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.1, delay: index * 0.05 }}
              key={index}
              className="border-b border-gray-200 pb-8"
            >
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: index * 0.01 }}
                className="text-xl font-semibold text-gray-900 mb-3"
              >
                {faq.question}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: index * 0.01 }}
                className="text-gray-600"
              >
                {faq.answer}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12 text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"
        >
          {showAll ? "Показати менше" : "Показати більше"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
