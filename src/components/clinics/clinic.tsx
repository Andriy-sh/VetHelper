import React from "react";
import { AppointmentDialog } from "./appointmentDialog";
import { prisma } from "../../../prisma";
import Link from "next/link";

export default async function SingleClinic({
  clinic,
  user,
  pets,
}: {
  clinic: {
    id: string;
    name: string;
    description: string;
    address: string;
    phone: string;
    city: string;
    website: string;
    updatedAt: string;
    createdAt: string;
  };
  user: {
    id: string;
    role: string;
    clinicId: string;
  };
  pets: {
    id: string;
    name: string;
    image: string | null;
  }[];
}) {
  const appointments = await prisma.appointment.findMany({
    where: { clinicId: clinic.id },
  });
  return (
    <div className="min-h-[90vh] min-w-[90vh] p-8 bg-gray-50 flex items-center justify-center">
      <div className="min-h-[80vh] w-full bg-white shadow-2xl rounded-lg overflow-hidden ">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">{clinic.name}</h1>
            {clinic.id === user.clinicId && (
              <Link
                href={`/clinics/${clinic.id}/dashboard`}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Перегляд прийомів
              </Link>
            )}
          </div>
          <p className="text-gray-600 mb-6 text-lg">{clinic.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4">
              <h2 className="text-2xl flex justify-center font-semibold text-gray-700 border-b-2 border-blue-500 pb-2">
                Контактна інформація
              </h2>
              <p className="text-gray-600">
                <span className="font-medium">Адреса:</span> {clinic.address},{" "}
                {clinic.city}
              </p>
              {clinic.phone && (
                <p className="text-gray-600">
                  <span className="font-medium">Телефон:</span> {clinic.phone}
                </p>
              )}
              {clinic.website && (
                <p className="text-gray-600">
                  <span className="font-medium">Вебсайт:</span>{" "}
                  <a
                    href={clinic.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {clinic.website}
                  </a>
                </p>
              )}
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2">
                Додаткова інформація
              </h2>
              <p className="text-gray-600">
                <span className="font-medium">Створено:</span>{" "}
                {new Date(clinic.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Оновлено:</span>{" "}
                {new Date(clinic.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <AppointmentDialog
            name={clinic.name}
            clinicId={clinic.id}
            userId={user.id}
            times={appointments.map((a) => a.time)}
            date={appointments.map((a) => a.date)}
            pets={pets}
          />
        </div>
      </div>
    </div>
  );
}
