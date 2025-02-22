import { auth } from "../../../auth";
import { prisma } from "../../../prisma";

export const PetInfo = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const pets = await prisma.pet.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-6">
      {pets.length > 0 ? (
        pets.map((pet) => (
          <div
            key={pet.id}
            className="pet-card max-w-xs p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {pet.name}
            </h3>
            <div className="text-gray-600">
              <p>
                <strong>Species:</strong> {pet.species}
              </p>
              <p>
                <strong>Breed:</strong> {pet.breed}
              </p>
              <p>
                <strong>Age:</strong> {pet.age}
              </p>
              <p>
                <strong>Gender:</strong> {pet.gender}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-700">No pets found</p>
      )}
    </div>
  );
};
