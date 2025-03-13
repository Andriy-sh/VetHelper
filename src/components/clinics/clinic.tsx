import React from "react";
import { AppointmentDialog } from "./appointmentDialog";
import { prisma } from "../../../prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default async function SingleClinic({
  clinic,
  user,
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
  };
}) {
  const as = await prisma.appointment.findMany({
    where: { clinicId: clinic.id },
  });

  return (
    <div className="min-h-[90vh] min-w-[90vh] p-8 bg-gray-50 flex items-center justify-center">
      <div className="min-h-[80vh] w-full bg-white shadow-2xl rounded-lg overflow-hidden ">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {clinic.name}
          </h1>
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
            times={as.map((a) => a.time)}
            date={as.map((a) => a.date)}
          />
          {user.role === "Veterinarian" && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2">
                Прийоми
              </h2>

              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Час</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Проблема</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {as.map(
                      (appointment) =>
                        appointment.status !== "COMPLETED" &&
                        appointment.status !== "CANCELED" && (
                          <TableRow key={appointment.id}>
                            <TableCell>
                              {new Date(appointment.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{appointment.time}</TableCell>
                            <TableCell>{appointment.status}</TableCell>
                            <TableCell>{appointment.notes}</TableCell>
                          </TableRow>
                        )
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
