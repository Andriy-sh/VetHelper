import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-400 to-neutral-200">
      <div className="container mx-auto px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text-5xl text-gray-800">Блог</h1>
          <a
            href="/blog"
            className="flex items-center gap-2 text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors"
          >
            Переглянути все
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        <div className="p-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Корисні поради для власників домашніх тварин
          </h2>
          <p className="text-xl text-gray-600">
            Дізнайтеся більше про догляд та здоров&apos;я ваших улюбленців
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl flex flex-col items-center p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group border border-gray-100">
            <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
              <Image
                width={400}
                height={300}
                alt="Здорове харчування"
                src="/healthy.png"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <span className="absolute bottom-3 left-3 text-sm bg-blue-100 text-blue-600 font-semibold px-4 py-1 rounded-full backdrop-blur-sm">
                Здоров&apos;я
              </span>
            </div>

            <h2 className="font-bold text-2xl text-gray-800 mt-2 text-center group-hover:text-blue-600 transition-colors">
              Правильне харчування вашого улюбленця
            </h2>
            <p className="text-lg text-gray-600 mt-3 text-center line-clamp-2">
              Поради щодо збалансованого раціону для здоров&aposя вашої тварини
            </p>

            <div className="flex items-center justify-between mt-6 w-full pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ring-4 ring-blue-50">
                  <span className="text-blue-600 font-semibold">ОК</span>
                </div>
                <div>
                  <p className="text-gray-800 font-semibold">Др. Ковальчук</p>
                  <p className="text-sm text-gray-500">15 Лютого 2024</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                7 хв
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              </span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl flex flex-col items-center p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group border border-gray-100">
            <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
              <Image
                width={400}
                height={300}
                alt="Поведінка тварин"
                src="/behavior.png"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <span className="absolute bottom-3 left-3 text-sm bg-purple-100 text-purple-600 font-semibold px-4 py-1 rounded-full backdrop-blur-sm">
                Поведінка
              </span>
            </div>

            <h2 className="font-bold text-2xl text-gray-800 mt-2 text-center group-hover:text-purple-600 transition-colors">
              Ознаки стресу у домашніх тварин
            </h2>
            <p className="text-lg text-gray-600 mt-3 text-center line-clamp-2">
              Як розпізнати тривожність у вашого улюбленця
            </p>

            <div className="flex items-center justify-between mt-6 w-full pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center ring-4 ring-purple-50">
                  <span className="text-purple-600 font-semibold">МП</span>
                </div>
                <div>
                  <p className="text-gray-800 font-semibold">Др. Петренко</p>
                  <p className="text-sm text-gray-500">11 Січня 2024</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                5 хв
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              </span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl flex flex-col items-center p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group border border-gray-100">
            <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
              <Image
                width={400}
                height={300}
                alt="Тренування собак"
                src="/training.png"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <span className="absolute bottom-3 left-3 text-sm bg-green-100 text-green-600 font-semibold px-4 py-1 rounded-full backdrop-blur-sm">
                Тренування
              </span>
            </div>

            <h2 className="font-bold text-2xl text-gray-800 mt-2 text-center group-hover:text-green-600 transition-colors">
              Базові команди для собак
            </h2>
            <p className="text-lg text-gray-600 mt-3 text-center line-clamp-2">
              Ефективні методи навчання вашого собаки
            </p>

            <div className="flex items-center justify-between mt-6 w-full pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center ring-4 ring-green-50">
                  <span className="text-green-600 font-semibold">ВЛ</span>
                </div>
                <div>
                  <p className="text-gray-800 font-semibold">Василь Лисенко</p>
                  <p className="text-sm text-gray-500">22 Березня 2024</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                6 хв
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
