import Image from "next/image";
import { Bot, Brain, Shield, Zap } from "lucide-react";

export default function ChatBot() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-neutral-200 to-slate-300">
      <div className="w-full h-full px-16 py-28 flex gap-x-[80px]">
        <div className="flex-1 flex-col flex justify-center space-y-8">
          <h1 className="font-bold text-5xl ">
            Розумний чат-бот для перевірки симптомів вашого улюбленця
          </h1>

          <p className="font-normal text-lg text-gray-700">
            Наш інтелектуальний помічник надає миттєві рекомендації на основі
            симптомів вашого улюбленця. Система аналізує введені дані та
            пропонує попередні поради для збереження здоров&apos;я вашої
            тварини.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group">
              <Brain className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
              <h2 className="font-bold text-xl mb-2">Швидкий Аналіз</h2>
              <p className="text-gray-600">
                Миттєва оцінка симптомів для вашого спокою
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group">
              <Shield className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
              <h2 className="font-bold text-xl mb-2">Надійні Поради</h2>
              <p className="text-gray-600">
                Перевірені рекомендації від ветеринарних експертів
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group">
              <Bot className="w-8 h-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
              <h2 className="font-bold text-xl mb-2">Простий Інтерфейс</h2>
              <p className="text-gray-600">
                Зручний та доступний для всіх власників тварин
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group">
              <Zap className="w-8 h-8 text-amber-600 mb-3 group-hover:scale-110 transition-transform" />
              <h2 className="font-bold text-xl mb-2">Миттєва Допомога</h2>
              <p className="text-gray-600">
                Отримайте відповідь за лічені секунди
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
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
        </div>
      </div>
    </div>
  );
}
