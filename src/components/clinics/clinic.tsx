"use client";
import React, { useState } from "react";
import { AppointmentDialog } from "./appointmentDialog";
import Link from "next/link";
import AddPostButton from "./addingClinicImages";
import Image from "next/image";
import { Appointment, ClinicImages, Pet } from "@/lib/interface";

export default function SingleClinic({
  clinic,
  user,
  pets,
  clinicImages,
  appointments,
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
  pets: Pet[];
  clinicImages: ClinicImages[];
  appointments: Appointment[];
}) {
  const [view, setView] = useState("info");

  return (
    <div className="min-h-[90vh] min-w-[90vh] p-8 bg-gray-50 flex items-center justify-center">
      <div className="min-h-[80vh] w-full bg-white shadow-2xl rounded-lg overflow-hidden p-8">
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

        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              view === "info" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("info")}
          >
            Основна інформація
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              view === "photos" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("photos")}
          >
            Фотографії
          </button>
        </div>

        {view === "info" && (
          <div>
            <p className="text-gray-600 mb-6 text-lg">{clinic.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 text-center">
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
                    <span className="font-medium">Вебсайт:</span>
                    <a
                      href={clinic.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {" "}
                      {clinic.website}
                    </a>
                  </p>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 text-center">
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
              <div className="mt-8">
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
        )}

        {view === "photos" && (
          <div>
            {clinic.id === user.clinicId && <AddPostButton user={user} />}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {clinicImages.map((image) => (
                <div key={image.id} className="text-center">
                  <Image
                    width={200}
                    height={200}
                    src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_400,h_400,c_thumb/${image.url}`}
                    alt={image.title ?? "Фото клініки"}
                    className="rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
