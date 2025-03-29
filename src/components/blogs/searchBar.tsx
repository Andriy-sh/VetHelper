
export default function SearchBar() {
  return (
    <div className="w-full bg-gray-100 rounded-lg shadow-md p-4">
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Пошук статей..."
          className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Пошук
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <select className="w-1/3 px-4 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Виберіть категорію</option>
          <option value="health">Здоров`я</option>
          <option value="nutrition">Харчування</option>
          <option value="training">Тренування</option>
        </select>
        <select className="w-1/3 px-4 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Виберіть теги</option>
          <option value="dogs">Собаки</option>
          <option value="cats">Коти</option>
          <option value="birds">Птахи</option>
        </select>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          Застосувати
        </button>
      </div>
    </div>
  );
}
