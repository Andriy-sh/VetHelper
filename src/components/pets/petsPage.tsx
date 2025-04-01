import { Pet } from "@/lib/interface";
import Link from "next/link";
import ChangePetAvatar from "./changePetAvatar";
import { PlusCircle } from "lucide-react";

export default function PetsPage({ pets }: { pets: Pet[] }) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Ваші улюбленці</h1>
        <Link
          href="/adding-pet"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} /> Додати улюбленця
        </Link>
      </div>

      {pets.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Немає улюбленців 😔</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <Link
              href={`/pets/${pet.id}`}
              key={pet.id}
              className="relative block rounded-3xl shadow-3xl overflow-hidden border-t-4 border-blue-500 transition-all duration-300 ease-in-out transform hover:translate-y-2 hover:shadow-lg bg-white"
            >
              <div className="flex flex-col items-center p-5">
                <ChangePetAvatar
                  height={128}
                  width={128}
                  className="rounded-full border-4 border-white shadow-md"
                  change={true}
                  imageId={pet.image || ""}
                  petId={pet.id}
                />
                <div className="mt-4 text-xl font-semibold text-gray-900">
                  {pet.name}
                </div>
                <p className="text-gray-500 text-sm">
                  {pet.breed ? pet.breed : "Невідома порода"}
                </p>
                <p className="text-gray-600 text-sm">
                  Вік: {pet.age ? `${pet.age} років` : "Не вказано"}
                </p>
                <p className="text-gray-600 text-sm">
                  Стать: {pet.gender ? pet.gender : "Не вказано"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
