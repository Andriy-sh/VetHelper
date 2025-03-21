import { Appointment } from "@/lib/interface";
import { Pet } from "@prisma/client";
import ChangeAvatar from "../profile/changeAvatar";

export default function AppointmentInfo({
  appointment,
  pet,
}: {
  appointment: Appointment;
  pet: Pet;
}) {
  return (
    <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
          <h1 className="text-3xl font-bold text-white text-center">
            Інформація про прийом
          </h1>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-8">
            <ChangeAvatar
              height={160}
              width={160}
              className="rounded-full border-4 border-white shadow-lg"
              change={false}
              imageId={pet.image ?? ""}
              userIds={pet.userId}
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
              <p className="text-gray-600 mt-2">
                {pet.species} {pet.breed ? `— ${pet.breed}` : ""}
              </p>
              <p className="text-gray-600">Вік: {pet.age ?? "Невідомий"}</p>
              <p className="text-gray-600">Стать: {pet.gender ?? "Невідомо"}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Деталі запису
            </h3>
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-semibold">Дата і час:</span>{" "}
                {appointment.date.toLocaleDateString()} о {appointment.time}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Статус запису:</span>{" "}
                {appointment.status}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Клініка:</span>{" "}
                {appointment.clinicId}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Примітки:</span>{" "}
                {appointment.notes ?? "Немає приміток"}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Історія хвороб
            </h3>
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-semibold">Останній візит:</span>{" "}
                12.10.2023 — Діагноз: алергія
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Попередній візит:</span>{" "}
                05.08.2023 — Діагноз: захворювання шкіри
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Коментар ветеринара:</span>{" "}
                Рекомендую регулярні огляди та спеціальну дієту.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Медичні документи
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src="/path/to/medical-image-1.jpg"
                  alt="Medical Document"
                  className="w-full h-32 object-cover rounded-md"
                />
                <p className="text-sm text-gray-600 mt-2">Фото шкіри</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src="/path/to/medical-image-2.jpg"
                  alt="Medical Document"
                  className="w-full h-32 object-cover rounded-md"
                />
                <p className="text-sm text-gray-600 mt-2">Рентген</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src="/path/to/medical-image-3.jpg"
                  alt="Medical Document"
                  className="w-full h-32 object-cover rounded-md"
                />
                <p className="text-sm text-gray-600 mt-2">Аналізи крові</p>
              </div>
            </div>
          </div>

          {appointment.status !== "CANCELED" && (
            <div className="flex justify-end space-x-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                Підтвердити
              </button>
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">
                Скасувати
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
