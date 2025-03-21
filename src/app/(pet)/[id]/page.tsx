import { prisma } from "../../../../prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { FaPaw } from "react-icons/fa";
import EditDialog from "@/components/pets/editDialog";

export async function generateStaticParams() {
  const pets = await prisma.pet.findMany({ select: { id: true } });
  return pets.map((pet) => ({ id: pet.id }));
}

export default async function Page({ params }: { params: { id: string } }) {
  if (!params?.id) {
    notFound();
  }

  const pet = await prisma.pet.findUnique({
    where: { id: params.id },
  });

  if (!pet) {
    notFound();
  }

  return (
    <div className="flex">
      <div className="p-6 w-screen h-screen">
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
        <div className="mt-4">
          <h3 className="text-2xl font-semibold text-gray-800">{pet.name}</h3>
          <div className="space-y-2 mt-2">
            <p className="text-gray-700 text-lg">
              <span className="font-medium">Age:</span> {pet.age}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium">Species:</span> {pet.species}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium">Gender:</span> {pet.gender}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium">Breed:</span> {pet.breed}
            </p>
          </div>
          <EditDialog pet={pet} />
        </div>
      </div>
    </div>
  );
}
