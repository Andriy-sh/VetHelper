"use client";

import EditDialog from "@/components/pets/editDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import ChangePetAvatar from "@/components/pets/changePetAvatar";
import { PawPrint } from "lucide-react";

import { Appointment, Pet, User, Vacctination } from "@/lib/interface";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form } from "../ui/form";
import VacctinationDialog from "./vaccinationDialog";

export default function PetInfo({
  pet,
  appointments,
  user,
  vacctination,
}: {
  pet: Pet;
  appointments: Appointment[];
  user: User;
  vacctination: Vacctination[];
}) {
  const [petData, setPetData] = useState(pet);
  const [visibleVaccinations, setVisibleVaccinations] = useState(5);
  const visibleVacctinations = vacctination.slice(0, visibleVaccinations);

  return (
    <div className="flex justify-center  min-h-[80vh] bg-gray-100 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-4xl border-t-8 border-blue-500">
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative w-36 h-36">
            {pet.image ? (
              <ChangePetAvatar
                height={160}
                width={160}
                className="rounded-full border-4 border-white shadow-lg"
                change={true}
                imageId={pet.image ?? ""}
                petId={pet.id}
              />
            ) : (
              <PawPrint className="w-36 h-36" />
            )}
          </div>
          <div className="flex flex-col space-y-2 w-2/3">
            <h3 className="text-3xl font-bold text-gray-900">{petData.name}</h3>
            <p className="text-lg text-gray-700">
              {petData.species} | {petData.breed}
            </p>
            <p className="text-md text-gray-600">{petData.age} years old</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">
              General Information
            </h4>
            <p>
              <strong>Species:</strong> {petData.species}
            </p>
            <p>
              <strong>Gender:</strong> {petData.gender}
            </p>
            <p>
              <strong>Breed:</strong> {petData.breed}
            </p>
            <p>
              <strong>Age:</strong> {petData.age} years
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">
              Medical History
            </h4>
            <p>
              <strong>Last visit:</strong>{" "}
              {petData.lastVisit || "No visits yet"}
            </p>
            <p>
              <strong>Vaccinations:</strong>{" "}
              {petData.vaccinations || "Not recorded"}
            </p>
            <p>
              <strong>Known illnesses:</strong>{" "}
              {petData.illnesses || "No known illnesses"}
            </p>
          </div>
        </div>

        <div className="p-6 bg-gray-100 rounded-lg shadow-sm mb-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl">
                Історія відвідувань
              </AccordionTrigger>
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
        <div className="p-6 bg-gray-100 rounded-lg shadow-sm mb-6">
          <Accordion
            type="single"
            collapsible
            onValueChange={() => setVisibleVaccinations(5)}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl">
                Історія вакцинації
              </AccordionTrigger>
              <AccordionContent>
                {user.role === "VETERINARIAN" && (
                  <VacctinationDialog petId={pet.id} />
                )}

                {vacctination.length > 0 ? (
                  <>
                    {visibleVacctinations.map((vac) => (
                      <div
                        key={vac.id}
                        className="w-full p-4 bg-white rounded-lg shadow-md border border-gray-200 mb-3"
                      >
                        <h4 className="text-lg font-semibold text-gray-900">
                          {vac.name}
                        </h4>
                        <p className="text-gray-700">
                          {vac.notes || "Без приміток"}
                        </p>
                        <div className="text-sm text-gray-600">
                          <p>
                            <strong>Дата вакцинації:</strong>{" "}
                            {vac.date.toLocaleDateString()}
                          </p>
                          <p
                            className={
                              vac.nextDoseDue
                                ? "text-yellow-600"
                                : "text-gray-600"
                            }
                          >
                            <strong>Наступна доза:</strong>{" "}
                            {vac.nextDoseDue
                              ? vac.nextDoseDue.toLocaleDateString()
                              : "Немає запланованої дати"}
                          </p>
                        </div>
                      </div>
                    ))}
                    {vacctination.length > visibleVaccinations && (
                      <button
                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg"
                        onClick={() =>
                          setVisibleVaccinations((prev) => prev + 5)
                        }
                      >
                        Показати ще
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500">Немає записів про вакцинації</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex justify-center">
          <EditDialog pet={pet} setPetData={setPetData} />
        </div>
      </div>
    </div>
  );
}
