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

import { Appointment, Pet, User, Vacctination, Allergy } from "@/lib/interface";
import { useState } from "react";
import VacctinationDialog from "./vaccinationDialog";
import AllergyDialog from "./allergyDialog";
import {
  FaPaw,
  FaVenusMars,
  FaDog,
  FaCat,
  FaBirthdayCake,
  FaSyringe,
  FaAllergies,
  FaStethoscope,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaNotesMedical,
  FaBone,
  FaCalendarAlt,
} from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";

export default function PetInfo({
  pet,
  appointments,
  user,
  vacctination,
  allergies,
}: {
  pet: Pet;
  appointments: Appointment[];
  user: User;
  vacctination: Vacctination[];
  allergies: Allergy[];
}) {
  const [petData, setPetData] = useState(pet);
  const [visibleVaccinations, setVisibleVaccinations] = useState(5);
  const [visibleAllergies, setVisibleAllergies] = useState(5);
  const visibleVacctinations = vacctination.slice(0, visibleVaccinations);
  const visibleAllergyList = allergies.slice(0, visibleAllergies);
  const getLastVisit = () => {
    if (!appointments || appointments.length === 0) {
      return "Не записано";
    }

    const sortedAppointments = [...appointments].sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );

    const lastAppointment = sortedAppointments[0];
    return `${lastAppointment.date.toLocaleDateString()} о ${
      lastAppointment.time
    }`;
  };
  const getSpeciesIcon = () => {
    switch (petData.species.toLowerCase()) {
      case "dog":
        return <FaDog className="inline mr-2" />;
      case "cat":
        return <FaCat className="inline mr-2" />;
      default:
        return <FaPaw className="inline mr-2" />;
    }
  };

  return (
    <div className="flex justify-center min-h-[80vh] bg-gray-50 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl border-t-8 border-blue-500">
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6 space-y-4 md:space-y-0 mb-8">
          <div className="relative w-32 h-32">
            <ChangePetAvatar
              height={128}
              width={128}
              className="rounded-full border-4 border-white shadow-lg"
              change={true}
              imageId={pet.image || ""}
              petId={pet.id}
            />
          </div>
          <div className="flex flex-col space-y-2 w-full md:w-2/3 text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center justify-center md:justify-start">
              {getSpeciesIcon()} {petData.name}
            </h3>
            <p className="text-lg text-gray-700">
              {petData.species} | {petData.breed}
            </p>
            <p className="text-md text-gray-600 flex items-center justify-center md:justify-start">
              <FaBirthdayCake className="mr-2" /> {petData.age} років
            </p>
          </div>
        </div>

        <div className="p-6 bg-blue-50 rounded-lg shadow-sm mb-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <FaUser className="mr-2 text-blue-600" /> Інформація про власника
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="flex items-center">
              <strong className="flex items-center mr-2">
                <FaUser className="mr-1" /> Ім`я:
              </strong>
              {user.name || "Не вказано"}
            </p>
            <p className="flex items-center">
              <strong className="flex items-center mr-2">
                <FaPhone className="mr-1" /> Телефон:
              </strong>
              Не вказано
            </p>
            <p className="flex items-center">
              <strong className="flex items-center mr-2">
                <FaMapMarkerAlt className="mr-1" /> Адреса:
              </strong>
              Не вказано
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-green-50 rounded-lg shadow-sm">
            <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <FaPaw className="mr-2 text-green-600" /> Основна інформація
            </h4>
            <p className="flex items-center mb-2">
              <FaPaw className="mr-2 text-gray-500" />
              <strong>Вид:</strong>{" "}
              <span className="ml-1">{petData.species}</span>
            </p>
            <p className="flex items-center mb-2">
              <FaVenusMars className="mr-2 text-gray-500" />
              <strong>Стать:</strong>{" "}
              <span className="ml-1">{petData.gender}</span>
            </p>
            <p className="flex items-center mb-2">
              {getSpeciesIcon()}
              <strong>Порода:</strong>{" "}
              <span className="ml-1">{petData.breed}</span>
            </p>
            <p className="flex items-center">
              <FaBirthdayCake className="mr-2 text-gray-500" />
              <strong>Вік:</strong>{" "}
              <span className="ml-1">{petData.age} років</span>
            </p>
          </div>

          <div className="p-6 bg-red-50 rounded-lg shadow-sm">
            <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
              <FaNotesMedical className="mr-2 text-red-600" /> Медична
              інформація
            </h4>
            <p className="flex items-center mb-2">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              <strong>Останній візит:</strong>{" "}
              <span className="ml-1">{getLastVisit()}</span>
            </p>
            <p className="flex items-center mb-2">
              <FaSyringe className="mr-2 text-gray-500" />
              <strong>Вакцинації:</strong>{" "}
              <span className="ml-1">Не записано</span>
            </p>
            <p className="flex items-center mb-2">
              <GiHealthNormal className="mr-2 text-gray-500" />
              <strong>Хвороби:</strong>{" "}
              <span className="ml-1">Немає відомих хвороб</span>
            </p>
            <p className="flex items-center">
              <FaBone className="mr-2 text-gray-500" />
              <strong>Харчування:</strong>{" "}
              <span className="ml-1">Стандартний раціон</span>
            </p>
          </div>
        </div>

        <div className="p-6 bg-purple-50 rounded-lg shadow-sm mb-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="visits">
              <AccordionTrigger className="text-xl flex items-center">
                <FaStethoscope className="mr-2 text-purple-600" /> Історія
                відвідувань
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <Link
                      href={`/clinics/${appointment.clinicId}/appointment/${appointment.id}`}
                      key={appointment.id}
                    >
                      <div className="w-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 mb-3">
                        <p className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-purple-500" />
                          Клініка:{" "}
                          <span className="font-normal text-gray-700 ml-1">
                            {appointment.clinic.name}
                          </span>
                        </p>
                        <p className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaCalendarAlt className="mr-2 text-purple-500" />
                          Час:{" "}
                          <span className="font-normal text-gray-700 ml-1">
                            {`${appointment.date.toLocaleDateString()} ${appointment.time.toLocaleString()} `}
                          </span>
                        </p>
                        <p className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaNotesMedical className="mr-2 text-purple-500" />
                          Проблема:{" "}
                          <span className="font-normal text-gray-700 ml-1">
                            {appointment.notes || "Не вказано"}
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Немає записів про відвідування
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="p-6 bg-yellow-50 rounded-lg shadow-sm mb-6">
          <Accordion
            type="single"
            collapsible
            onValueChange={() => setVisibleVaccinations(5)}
          >
            <AccordionItem value="vaccinations">
              <AccordionTrigger className="text-xl flex items-center">
                <FaSyringe className="mr-2 text-yellow-600" /> Історія
                вакцинацій
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {user.role === "VETERINARIAN" && (
                  <VacctinationDialog
                    petId={pet.id}
                    clinicId={user.clinicId || ""}
                  />
                )}
                {vacctination.length > 0 ? (
                  <>
                    {visibleVacctinations.map((vac) => (
                      <div
                        key={vac.id}
                        className="w-full p-4 bg-white rounded-lg shadow-md border border-gray-200 mb-3"
                      >
                        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaSyringe className="mr-2 text-yellow-500" />
                          {vac.name}
                        </h4>
                        <p className="text-gray-700 flex items-center">
                          <FaNotesMedical className="mr-2 text-yellow-500" />
                          {vac.notes || "Без приміток"}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <FaCalendarAlt className="mr-2 text-yellow-500" />
                          <strong>Дата вакцинації:</strong>{" "}
                          {new Date(vac.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-pink-500" />
                          <strong>Клініка:</strong> {vac.clinic.name}
                        </p>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Немає записів про вакцинації
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="p-6 bg-pink-50 rounded-lg shadow-sm mb-6">
          <Accordion
            type="single"
            collapsible
            onValueChange={() => setVisibleAllergies(5)}
          >
            <AccordionItem value="allergies">
              <AccordionTrigger className="text-xl flex items-center">
                <FaAllergies className="mr-2 text-pink-600" /> Алергії
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                {user.role === "VETERINARIAN" && (
                  <AllergyDialog
                    petId={pet.id}
                    clinicId={user.clinicId || ""}
                  />
                )}
                {allergies.length > 0 ? (
                  <>
                    {visibleAllergyList.map((allergy) => (
                      <div
                        key={allergy.id}
                        className="w-full p-4 bg-white rounded-lg shadow-md border border-gray-200 mb-3"
                      >
                        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaAllergies className="mr-2 text-pink-500" />
                          {allergy.name}
                        </h4>
                        <p className="text-gray-700">
                          <strong className="flex items-center">
                            <FaNotesMedical className="mr-2 text-pink-500" />
                            Симптоми:
                          </strong>
                          <span className="ml-6">{allergy.symptoms}</span>
                        </p>
                        <p className="text-gray-700">
                          <strong className="flex items-center">
                            <FaNotesMedical className="mr-2 text-pink-500" />
                            Рекомендації:
                          </strong>
                          <span className="ml-6">
                            {allergy.recommendations || "Немає рекомендацій"}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <FaCalendarAlt className="mr-2 text-pink-500" />
                          <strong>Дата виявлення:</strong>{" "}
                          {new Date(allergy.dateDetected).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-pink-500" />
                          <strong>Клініка:</strong> {allergy.clinic.name}
                        </p>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Немає записів про алергії
                  </p>
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
