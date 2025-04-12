"use client";
import { Smartphone, UserPlus, Key } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: {
    bg: string;
    text: string;
  };
}

export default function Features() {
  const features: Feature[] = [
    {
      title: "Мобільний та Веб Доступ",
      description: "Зручний доступ з будь-якого пристрою в будь-який час",
      icon: Smartphone,
      color: {
        bg: "bg-blue-100",
        text: "text-blue-600",
      },
    },
    {
      title: "Проста Реєстрація",
      description: "Швидке створення профілю для вас та ваших улюбленців",
      icon: UserPlus,
      color: {
        bg: "bg-purple-100",
        text: "text-purple-600",
      },
    },
    {
      title: "OAuth Авторизація",
      description: "Швидкий вхід через Google або GitHub",
      icon: Key,
      color: {
        bg: "bg-green-100",
        text: "text-green-600",
      },
    },
  ];
  const { ref, inView } = useInViewOnce();
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-300 to-slate-400">
      <div className="w-[80%] px-16 py-28">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-lg text-gray-600 font-semibold"
          >
            Можливості
          </motion.p>
          <motion.h1
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="font-bold text-5xl mt-4 text-gray-800"
          >
            Основні Функції VetHelper
          </motion.h1>
          <motion.p
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Зручний доступ до ветеринарних послуг на будь-якому пристрої
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false }}
                exit={{ opacity: 0, y: 40 }}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`${feature.color.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform`}
                >
                  <Icon className={`w-8 h-8 ${feature.color.text}`} />
                </motion.div>
                <h2 className="font-bold text-2xl text-gray-800 mb-4">
                  {feature.title}
                </h2>
                <p className="text-gray-600 mb-6">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
