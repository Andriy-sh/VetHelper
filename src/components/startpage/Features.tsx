import { Smartphone, UserPlus, Key } from "lucide-react";

export default function Features() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-300 to-slate-400">
      <div className="w-[80%] px-16 py-28">
        <div className="text-center mb-16">
          <p className="text-lg text-gray-600 font-semibold">Можливості</p>
          <h1 className="font-bold text-5xl mt-4 text-gray-800">
            Основні Функції VetHelper
          </h1>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Зручний доступ до ветеринарних послуг на будь-якому пристрої
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all group">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="font-bold text-2xl text-gray-800 mb-4">
              Мобільний та Веб Доступ
            </h2>
            <p className="text-gray-600 mb-6">
              Зручний доступ з будь-якого пристрою в будь-який час
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all group">
            <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <UserPlus className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="font-bold text-2xl text-gray-800 mb-4">
              Проста Реєстрація
            </h2>
            <p className="text-gray-600 mb-6">
              Швидке створення профілю для вас та ваших улюбленців
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all group">
            <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Key className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="font-bold text-2xl text-gray-800 mb-4">
              OAuth Авторизація
            </h2>
            <p className="text-gray-600 mb-6">
              Швидкий вхід через Google або GitHub
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
