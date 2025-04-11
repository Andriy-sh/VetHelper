import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-700 to-gray-950 text-white py-16">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h2 className="text-xl font-bold mb-6 text-white">
              Швидкі Посилання
            </h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  Про Нас
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  Контакти
                </a>
              </li>
              <li>
                <a
                  href="/faqs"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  Часті Питання
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  Блог
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-6 text-white">Ресурси</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="/pet-care"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Догляд за Тваринами
                </a>
              </li>
              <li>
                <a
                  href="/vet-tips"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Поради Ветеринара
                </a>
              </li>
              <li>
                <a
                  href="/success-stories"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Історії Успіху
                </a>
              </li>
              <li>
                <a
                  href="/community"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Спільнота
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-6 text-white">
              Соціальні Мережі
            </h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://facebook.com"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-3"
                >
                  <Facebook className="h-5 w-5" />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-3"
                >
                  <Twitter className="h-5 w-5" />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-3"
                >
                  <Instagram className="h-5 w-5" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-3"
                >
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-6 text-white">
              Підписка на Новини
            </h2>
            <p className="text-gray-300 mb-4">
              Отримуйте останні новини та поради щодо догляду за вашими
              улюбленцями
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Введіть email"
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Підписатися
              </button>
            </form>
            <p className="text-gray-400 text-sm mt-4">
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

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">© 2024 VetHelper. Всі права захищені.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a
              href="/privacy-policy"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Політика Конфіденційності
            </a>
            <a
              href="/terms-of-service"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Умови Використання
            </a>
            <a
              href="/cookie-settings"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Налаштування Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
