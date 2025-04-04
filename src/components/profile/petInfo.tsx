// app/profile/[id]/page.js
import Link from "next/link";
import Image from "next/image";
import { FaPaw } from "react-icons/fa";
import { PlusCircle } from "lucide-react";
import { getPets, getUser } from "@/lib/service/user";
import { auth } from "../../../auth";

export const PetInfo = async ({ userId }: { userId: string }) => {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const user = await getUser({ user: { email: session.user.email } });
  const pets = await getPets(userId);

  const profileId = userId;
  const isOwner = user.id === profileId;

  return (
    <div className="space-y-4 py-12">
      <h2 className="text-3xl font-bold text-center">
        Улюбленці ({pets.length})
      </h2>
      <hr className="my-2" />
      <div className="flex flex-col items-center justify-center overflow-auto max-h-[64vh]">
        <div className="max-w-[110vh] mt-5 space-y-4">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <div
                key={pet.id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition"
              >
                <Link
                  href={`/pets/${pet.id}`}
                  className="flex items-center gap-4"
                >
                  <div className="relative w-20 h-20">
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
                    <p className="text-gray-600">Вага: {pet.weight}</p>
                    <p className="text-gray-600">Порода: {pet.breed}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center py-8">
              Тваринки не знайдені
            </p>
          )}
        </div>
        {isOwner && (
          <div className="flex justify-center pt-4">
            <Link
              href="/adding-pet"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
            >
              <PlusCircle size={20} /> Додати улюбленця
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
