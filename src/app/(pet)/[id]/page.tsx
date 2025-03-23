import { prisma } from "../../../../prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { FaPaw } from "react-icons/fa";
import EditDialog from "@/components/pets/editDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import ChangePetAvatar from "@/components/pets/changePetAvatar";

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

  const appointments = await prisma.appointment.findMany({
    where: {
      petId: pet.id,
    },
    include: { clinic: true },
  });

  return (
    <div className="flex justify-center  min-h-[80vh] bg-gray-100 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-4xl border-t-8 border-blue-500">
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative w-36 h-36">
            <ChangePetAvatar
              height={160}
              width={160}
              className="rounded-full border-4 border-white shadow-lg"
              change={true}
              imageId={pet.image ?? ""}
              petId={pet.id}
            />
          </div>
          <div className="flex flex-col space-y-2 w-2/3">
            <h3 className="text-3xl font-bold text-gray-900">{pet.name}</h3>
            <p className="text-lg text-gray-700">
              {pet.species} | {pet.breed}
            </p>
            <p className="text-md text-gray-600">{pet.age} years old</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">
              General Information
            </h4>
            <p>
              <strong>Species:</strong> {pet.species}
            </p>
            <p>
              <strong>Gender:</strong> {pet.gender}
            </p>
            <p>
              <strong>Breed:</strong> {pet.breed}
            </p>
            <p>
              <strong>Age:</strong> {pet.age} years
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">
              Medical History
            </h4>
            <p>
              <strong>Last visit:</strong> {pet.lastVisit || "No visits yet"}
            </p>
            <p>
              <strong>Vaccinations:</strong>{" "}
              {pet.vaccinations || "Not recorded"}
            </p>
            <p>
              <strong>Known illnesses:</strong>{" "}
              {pet.illnesses || "No known illnesses"}
            </p>
          </div>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow-sm mb-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Історія відвідувань</AccordionTrigger>
              <AccordionContent>
                {appointments.map((appointment) => (
                  <Link
                    href={`/clinics/${appointment.clinicId}/${appointment.id}`}
                    key={appointment.id}
                  >
                    <div className="w-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200">
                      <div className="flex flex-col space-y-2">
                        <p className="text-lg font-semibold text-gray-900">
                          Клініка:{" "}
                          <span className="font-normal text-gray-700">
                            {appointment.clinic.city}
                          </span>
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          Час:{" "}
                          <span className="font-normal text-gray-700">
                            {appointment.time}
                          </span>
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          Проблема:{" "}
                          <span className="font-normal text-gray-700">
                            {appointment.notes}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex justify-center">
          <EditDialog pet={pet} />
        </div>
      </div>
    </div>
  );
}
