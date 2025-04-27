"use client";

import Image from "next/image";
import { Bot, Brain, Shield, Zap } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { motion } from "framer-motion";

interface ChatBotFeature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export default function ChatBot() {
  const features: ChatBotFeature[] = [
    {
      title: "Швидкий Аналіз",
      description: "Миттєва оцінка симптомів для вашого спокою",
      icon: Brain,
      color: "text-purple-600",
    },
    {
      title: "Надійні Поради",
      description: "Перевірені рекомендації від ветеринарних експертів",
      icon: Shield,
      color: "text-blue-600",
    },
    {
      title: "Простий Інтерфейс",
      description: "Зручний та доступний для всіх власників тварин",
      icon: Bot,
      color: "text-green-600",
    },
    {
      title: "Миттєва Допомога",
      description: "Отримайте відповідь за лічені секунди",
      icon: Zap,
      color: "text-amber-600",
    },
  ];

  const { ref, inView } = useInViewOnce();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-200 to-slate-300 px-4 py-20 sm:px-6 lg:px-16">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1 flex flex-col justify-center space-y-8">
          <motion.h1
            ref={ref}
            initial={{ opacity: 0, y: -50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.1 }}
            className="font-bold text-3xl sm:text-4xl lg:text-5xl text-center lg:text-left"
          >
            Розумний чат-бот для перевірки симптомів вашого улюбленця
          </motion.h1>

          <motion.p
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.1, delay: 0.04 }}
            className="text-gray-700 text-base sm:text-lg text-center lg:text-left"
          >
            Наш інтелектуальний помічник надає миттєві рекомендації на основі
            симптомів вашого улюбленця. Система аналізує введені дані та
            пропонує попередні поради для збереження здоров&apos;я вашої
            тварини.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: false }}
                  className="p-5 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group text-center sm:text-left"
                >
                  <Icon
                    className={`w-7 h-7 sm:w-8 sm:h-8 ${feature.color} mb-3 mx-auto sm:mx-0 group-hover:scale-110 transition-transform`}
                  />
                  <h2 className="font-bold text-lg sm:text-xl mb-1">
                    {feature.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          ref={ref}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="relative w-[260px] sm:w-[360px] lg:w-[480px] xl:w-[600px]">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-30"></div>
            <Image
              width={600}
              height={600}
              src="/chatbot.png"
              alt="Чат-бот для перевірки симптомів"
              className="relative rounded-2xl w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
