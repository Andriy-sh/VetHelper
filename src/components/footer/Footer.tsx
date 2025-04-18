import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-700 to-gray-950 text-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">
              Швидкі Посилання
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group text-sm sm:text-base"
                >
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-2 transition-transform" />
                  Про Нас
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group text-sm sm:text-base"
                >
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-2 transition-transform" />
                  Контакти
                </a>
              </li>
              <li>
                <a
                  href="/faqs"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group text-sm sm:text-base"
                >
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-2 transition-transform" />
                  Часті Питання
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group text-sm sm:text-base"
                >
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-2 transition-transform" />
                  Блог
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">
              Ресурси
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="/pet-care"
                  className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Догляд за Тваринами
                </a>
              </li>
              <li>
                <a
                  href="/vet-tips"
                  className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Поради Ветеринара
                </a>
              </li>
              <li>
                <a
                  href="/success-stories"
                  className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Історії Успіху
                </a>
              </li>
              <li>
                <a
                  href="/community"
                  className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Спільнота
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">
              Соціальні Мережі
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="https://facebook.com"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white">
              Підписка на Новини
            </h2>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              Отримуйте останні новини та поради щодо догляду за вашими
              улюбленцями
            </p>
            <form className="space-y-3 sm:space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Введіть email"
                  className="w-full px-4 py-2 sm:py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 text-sm sm:text-base"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium sm:font-semibold text-sm sm:text-base"
              >
                Підписатися
              </button>
            </form>
            <p className="text-gray-400 text-xs sm:text-sm mt-3 sm:mt-4">
              Підписуючись, ви погоджуєтесь з нашою{" "}
              <a
                href="/privacy-policy"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Політикою Конфіденційності
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 VetHelper. Всі права захищені.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-3 sm:mt-4">
            <a
              href="/privacy-policy"
              className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
            >
              Політика Конфіденційності
            </a>
            <a
              href="/terms-of-service"
              className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
            >
              Умови Використання
            </a>
            <a
              href="/cookie-settings"
              className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
            >
              Налаштування Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
