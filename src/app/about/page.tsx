export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-br from-blue-100 to-gray-100 p-6">
      <div className="max-w-4xl bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Про VetHelper</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          VetHelper — це інноваційна платформа, створена для полегшення
          взаємодії між ветеринарними клініками та їх клієнтами. Ми допомагаємо
          клінікам керувати своїми послугами, записами на прийом, відгуками та
          іншими важливими аспектами, а клієнтам — швидко знаходити потрібну
          клініку та отримувати якісну допомогу для своїх улюбленців.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-blue-500 mb-2">
              Для клінік
            </h2>
            <p className="text-gray-600">
              Управляйте своїми послугами, додавайте новини, відповідайте на
              відгуки та будьте ближче до своїх клієнтів.
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-blue-500 mb-2">
              Для клієнтів
            </h2>
            <p className="text-gray-600">
              Знаходьте клініки, записуйтесь на прийом, залишайте відгуки та
              отримуйте відповіді на часті питання.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <a
            href="/contact"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Зв`язатися з нами
          </a>
        </div>
      </div>
    </div>
  );
}
