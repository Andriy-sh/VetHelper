"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, Video, Shield, Phone } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useInViewOnce } from "@/hooks/useInViewOnce";

interface SupportItem {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export default function Support() {
  const support: SupportItem[] = [
    {
      title: "Цілодобовий Доступ",
      description:
        "Отримайте консультацію в будь-який час доби, коли вам це необхідно",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      title: "Відео Консультації",
      description: "Спілкуйтеся з ветеринарами через якісний відеозв'язок",
      icon: Video,
      color: "text-purple-600",
    },
    {
      title: "Надійна Підтримка",
      description: "Професійні ветеринари з багаторічним досвідом роботи",
      icon: Shield,
      color: "text-green-600",
    },
    {
      title: "Швидка Відповідь",
      description: "Термінові консультації протягом декількох хвилин",
      icon: Phone,
      color: "text-red-600",
    },
  ];

  const { ref, inView } = useInViewOnce();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-300 to-neutral-200 px-4 md:px-8 lg:px-16 py-16 md:py-24">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-y-12 lg:gap-x-20">
        <div className="flex-1 flex-col flex justify-center space-y-8">
          <motion.h1
            ref={ref}
            initial={{ opacity: 0, y: -50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-bold text-3xl md:text-4xl lg:text-5xl text-center lg:text-left"
          >
            Миттєвий доступ до ветеринарної допомоги
          </motion.h1>

          <motion.p
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-gray-700 text-center lg:text-left"
          >
            З VetHelper ви можете легко зв&apos;язатися з досвідченими
            ветеринарами через відеозв&apos;язок. Отримайте необхідну
            консультацію для здоров&apos;я вашого улюбленця, не виходячи з дому.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {support.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: false }}
                  exit={{ opacity: 0, y: 40 }}
                  key={index}
                  className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Icon className={`w-8 h-8 ${item.color} mb-3`} />
                  <h2 className="font-bold text-lg md:text-xl mb-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    {item.description}
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
          transition={{ duration: 1 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="relative w-full max-w-[500px]">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30"></div>
            <Image
              width={600}
              height={600}
              src="/call.png"
              alt="Відео консультація з ветеринаром"
              className="relative rounded-2xl w-full h-auto object-contain"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
