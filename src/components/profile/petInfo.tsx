import Link from "next/link";
import Image from "next/image";
import { FaPaw } from "react-icons/fa";
import { getPets, getUser } from "@/lib/service/user";
import { auth } from "../../../auth";
import ChangeAvatar from "./changeAvatar";
import { PlusCircle } from "lucide-react";

export const PetInfo = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const user = await getUser({ user: { email: session.user.email } });

  const pets = await getPets(user.id);

  return (
    <div className="space-y-6 ">
      <div className="max-w-[50vh] overflow-y-auto">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <Link
                href={`pets/${pet.id}`}
                className="flex items-center space-x-6"
              >
                <div className="relative w-24 h-24">
                  {pet.image ? (
                    <Image
                      width={220}
                      height={220}
                      src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_200,h_200,c_thumb/${pet.image}`}
                      alt={pet.name}
                      className="rounded-full object-cover aspect-square"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
                      <FaPaw className="text-gray-600 text-4xl" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {pet.name}
                  </h3>
                  <div className="space-y-2 mt-2">
                    <p className="text-gray-700 text-lg">
                      <span className="font-medium">Age:</span> {pet.age}
                    </p>
                    <p className="text-gray-700 text-lg">
                      <span className="font-medium">Species:</span>{" "}
                      {pet.species}
                    </p>
                    <p className="text-gray-700 text-lg">
                      <span className="font-medium">Gender:</span> {pet.gender}
                    </p>
                    <p className="text-gray-700 text-lg">
                      <span className="font-medium">Breed:</span> {pet.breed}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center py-8 text-xl">
            No pets found
          </p>
        )}
      </div>
      <div className="flex justify-center items-center">
        <Link
          href="/adding-pet"
          className="flex items-center text-center gap-2 justify-center w-[70%] px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <PlusCircle size={20} /> Додати улюбленця
        </Link>
      </div>
    </div>
  );
};
