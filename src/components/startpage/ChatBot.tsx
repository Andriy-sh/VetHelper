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
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-neutral-200 to-slate-300">
      <div className="w-full h-full px-16 py-28 flex gap-x-[80px]">
        <div className="flex-1 flex-col flex justify-center space-y-8">
          <motion.h1
            ref={ref}
            initial={{ opacity: 0, y: -50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="font-bold text-5xl"
          >
            Розумний чат-бот для перевірки симптомів вашого улюбленця
          </motion.h1>

          <motion.p
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="font-normal text-lg text-gray-700"
          >
            Наш інтелектуальний помічник надає миттєві рекомендації на основі
            симптомів вашого улюбленця. Система аналізує введені дані та
            пропонує попередні поради для збереження здоров&apos;я вашої
            тварини.
          </motion.p>

          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: false }}
                  exit={{ opacity: 0, y: 40 }}
                  key={index}
                  className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group"
                >
                  <Icon
                    className={`w-8 h-8 ${feature.color} mb-3 group-hover:scale-110 transition-transform`}
                  />
                  <h2 className="font-bold text-xl mb-2">{feature.title}</h2>
                  <p className="text-gray-600">{feature.description}</p>
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
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-30"></div>
            <Image
              width={600}
              height={600}
              src="/chatbot.png"
              alt="Чат-бот для перевірки симптомів"
              className="relative rounded-2xl"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
