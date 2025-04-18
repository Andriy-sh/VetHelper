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
import { motion, AnimatePresence } from "framer-motion";

export default function PetsPage({ pets }: { pets: Pet[] }) {
  const [petsList, setPetsList] = useState<Pet[]>(pets);

  const handleDelete = async (petId: string) => {
    try {
      await deletePet(petId);
      setPetsList((prevPets) => prevPets.filter((pet) => pet.id !== petId));
    } catch (error) {
      console.error("Помилка при видаленні улюбленця:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen bg-gradient-to-b from-white to-slate-200 p-6"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-800">Ваші улюбленці</h1>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/adding-pet"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            <PlusCircle size={20} /> Додати улюбленця
          </Link>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {petsList.length === 0 ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center text-gray-500 text-lg"
          >
            Немає улюбленців 😔
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {petsList.map((pet, index) => (
              <motion.div
                key={pet.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group rounded-3xl shadow-3xl overflow-hidden border-t-4 border-blue-500 bg-white"
              >
                <Link href={`/pets/${pet.id}`} className="block h-full">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center p-5"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ChangePetAvatar
                        height={128}
                        width={128}
                        className="rounded-full border-4 border-white shadow-md"
                        change={true}
                        imageId={pet.image || ""}
                        petId={pet.id}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-4 text-xl font-semibold text-gray-900"
                    >
                      {pet.name}
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-500 text-sm"
                    >
                      {pet.breed ? pet.breed : "Невідома порода"}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-gray-600 text-sm"
                    >
                      Вік: {pet.age ? `${pet.age} років` : "Не вказано"}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-600 text-sm"
                    >
                      Стать: {pet.gender ? pet.gender : "Не вказано"}
                    </motion.p>
                  </motion.div>
                </Link>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="absolute top-2 right-2"
                >
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
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
