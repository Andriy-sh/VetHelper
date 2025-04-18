"use client";
import Link from "next/link";
import Image from "next/image";
import { FaPaw } from "react-icons/fa";
import { PlusCircle } from "lucide-react";
import { Pet, User } from "@/lib/interface";
import { Session } from "next-auth";
import { motion } from "framer-motion";

export const PetInfo = ({
  userId,
  pets,
  user,
  session,
}: {
  userId: string;
  pets: Pet[];
  user: User;
  session: Session;
}) => {
  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const profileId = userId;
  const isOwner = user.id === profileId;

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center">
        <h2 className="text-3xl font-bold text-center flex space-x-4">
          Улюбленці
          <span className="ml-2 flex justify-center items-center text-3xl font-bold w-10 h-10 bg-red-400 rounded-full">
            <span>{pets.length}</span>
          </span>
        </h2>
      </div>

      <hr className="my-2" />
      <div className="flex flex-col justify-center overflow-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="mt-5 space-y-4 max-h-[64vh] overflow-x-hidden"
        >
          {pets.length > 0 ? (
            pets.map((pet, inx) => (
              <motion.div
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * inx,
                }}
                key={pet.id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition"
              >
                <Link
                  href={`/pets/${pet.id}`}
                  className="flex items-center gap-4"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                    {pet.image ? (
                      <Image
                        width={80}
                        height={80}
                        src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_200,h_200,c_thumb/${pet.image}`}
                        alt={pet.name}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
                        <FaPaw className="text-gray-600 text-3xl" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{pet.name}</h3>
                    <p className="text-gray-600">Вік: {pet.age}</p>
                    <p className="text-gray-600">Вага: Не вказано</p>
                    <p className="text-gray-600">Порода: {pet.breed}</p>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600 text-center py-8">
              Тваринки не знайдені
            </p>
          )}
        </motion.div>
      </div>

      <div className="lg:hidden flex justify-center">
        <Link
          href="/pets"
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
        >
          Показати всіх тваринок
        </Link>
      </div>

      {isOwner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="flex justify-center"
        >
          <Link
            href="/adding-pet"
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
          >
            <PlusCircle size={20} /> Додати улюбленця
          </Link>
        </motion.div>
      )}
    </div>
  );
};
