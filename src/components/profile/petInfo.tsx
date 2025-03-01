import Link from "next/link";
import Image from "next/image";
import { FaPaw } from "react-icons/fa";
import { getPets, getSession, getUser } from "@/lib/service/user";

export const PetInfo = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const user = await getUser({ user: { email: session.user.email } });

  const pets = await getPets(user.id);

  return (
    <div className="space-y-6 ">
      <div className="max-h-[63vh] overflow-y-auto">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
            >
              <Link href={`/${pet.id}`} className="flex items-center space-x-6">
                <div className="relative w-24 h-24">
                  {pet.image ? (
                    <Image
                      src={pet.image}
                      alt={pet.name}
                      fill
                      priority
                      className="rounded-full object-cover"
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
      <Link
        href="/adding-pet"
        className="text-lg flex bg-red-600 justify-center items-center text-white font-semibold hover:bg-black transition duration-300 shadow-lg hover:shadow-xl rounded-lg py-3 px-6"
      >
        Add Pet
      </Link>
    </div>
  );
};
