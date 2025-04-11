import Image from "next/image";
import { Clock, Video, Shield, Phone } from "lucide-react";

export default function Support() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-slate-300 to-neutral-200">
      <div className="w-full h-full px-16 py-28 flex gap-x-[80px]">
        <div className="flex-1 flex-col flex justify-center space-y-8">
          <h1 className="font-bold text-5xl">
            Миттєвий доступ до ветеринарної допомоги
          </h1>
          <p className="font-normal text-lg text-gray-700">
            З VetHelper ви можете легко зв&apos;язатися з досвідченими
            ветеринарами через відеозв&apos;язок. Отримайте необхідну
            консультацію для здоров&apos;я вашого улюбленця, не виходячи з дому.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Clock className="w-8 h-8 text-blue-600 mb-3" />
              <h2 className="font-bold text-xl mb-2">Цілодобовий Доступ</h2>
              <p className="text-gray-600">
                Отримайте консультацію в будь-який час доби, коли вам це
                необхідно
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Video className="w-8 h-8 text-purple-600 mb-3" />
              <h2 className="font-bold text-xl mb-2">Відео Консультації</h2>
              <p className="text-gray-600">
                Спілкуйтеся з ветеринарами через якісний відеозв&apos;язок
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Shield className="w-8 h-8 text-green-600 mb-3" />
              <h2 className="font-bold text-xl mb-2">Надійна Підтримка</h2>
              <p className="text-gray-600">
                Професійні ветеринари з багаторічним досвідом роботи
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Phone className="w-8 h-8 text-red-600 mb-3" />
              <h2 className="font-bold text-xl mb-2">Швидка Відповідь</h2>
              <p className="text-gray-600">
                Термінові консультації протягом декількох хвилин
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30"></div>
            <Image
              width={600}
              height={600}
              src="/call.png"
              alt="Відео консультація з ветеринаром"
              className="relative rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
