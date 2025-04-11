"use client";

import { Pet } from "@/lib/interface";
import Link from "next/link";
import ChangePetAvatar from "./changePetAvatar";
import { PlusCircle, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";
import { deletePet } from "@/lib/actions/deletePet";

export default function PetsPage({ pets }: { pets: Pet[] }) {
  const [petsList, setPetsList] = useState<Pet[]>(pets);

  const handleDelete = async (petId: string) => {
    try {
      await deletePet(petId);
      setPetsList(petsList.filter((pet) => pet.id !== petId));
    } catch (error) {
      console.error("Помилка при видаленні улюбленця:", error);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-white to-slate-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Ваші улюбленці</h1>
        <Link
          href="/adding-pet"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} /> Додати улюбленця
        </Link>
      </div>

      {petsList.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Немає улюбленців 😔</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {petsList.map((pet) => (
            <div
              key={pet.id}
              className="relative group rounded-3xl shadow-3xl overflow-hidden border-t-4 border-blue-500 transition-all duration-300 ease-in-out transform hover:translate-y-2 hover:shadow-lg bg-white"
            >
              <Link href={`/pets/${pet.id}`} className="block h-full">
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

              <div className="absolute top-2 right-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <X />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Ви впевнені, що хочете видалити {pet.name}?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Цю дію не можна скасувати. Це назавжди видалить дані
                        вашого улюбленця.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Ні</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(pet.id)}>
                        Так, видалити
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
