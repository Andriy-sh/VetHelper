"use client";
import Image from "next/image";
import Link from "next/link";
import { Appointment, Clinic, User } from "@/lib/interface";
import { Session } from "next-auth";
import ChangeAvatar from "./changeAvatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface UserInfoProps {
  user: User;
  session: Session;
  appointment: Appointment[];
  clinics: Clinic[];
}

export default function UserInfo({
  session,
  user,
  appointment,
  clinics,
}: UserInfoProps) {
  return (
    <div className="flex-1 flex flex-col items-center max-w-5xl justify-center bg-gray-50 py-12">
      <div className="w-full  min-h-[72vh] bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 p-8 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg">
              <ChangeAvatar
                width={128}
                height={128}
                userIds={user.id}
                imageId={user.image || ""}
                change={true}
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold">{user.name || "Guest"}</h1>
              <p className="text-indigo-100 text-xl mt-2">
                {user.email || "No email available"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Контактна інформація
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <MapPinIcon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-gray-600">Адреса:</p>
                  <p className="text-gray-800 font-medium">
                    {user.city || "Львів"} |{" "}
                    {user.address || "вул. Січових Стрільців 8"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <PhoneIcon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-gray-600">Телефон:</p>
                  <p className="text-gray-800 font-medium">
                    {user.phone || "+380 98 654 4790"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <MailIcon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-gray-600">Email:</p>
                  <p className="text-gray-800 font-medium">
                    {user.email || "qwerty@gmail.com"}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href={`/profile/${user.id}`}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <EditIcon className="h-5 w-5" />
              Редагувати профіль
            </Link>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Ваші відвідування
              </h2>

              {appointment.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Немає записів
                  </h3>
                  <p className="mt-1 text-gray-500">
                    Запишіться до клініки, щоб побачити свої візити тут.
                  </p>
                  <Link
                    href="/clinics"
                    className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Знайти клініку
                  </Link>
                </div>
              ) : (
                <Accordion type="single" collapsible>
                  <AccordionItem value="appointments">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <CalendarDaysIcon className="h-6 w-6 text-indigo-600" />
                        <span className="text-xl font-semibold text-gray-800">
                          Показати всі записи ({appointment.length})
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 mt-4">
                        {appointment.map((appointment) => (
                          <Link
                            key={appointment.id}
                            href={`/clinics/${appointment.clinicId}/appointment/${appointment.id}`}
                          >
                            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors group">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                    {clinics.find(
                                      (clinic) =>
                                        clinic.id === appointment.clinicId
                                    )?.name || "Unknown Clinic"}
                                  </h3>
                                  <p className="text-gray-600 mt-1">
                                    <ClockIcon className="inline h-4 w-4 mr-1" />
                                    {appointment.time}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                                    {appointment.status || "Заплановано"}
                                  </span>
                                  <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                                </div>
                              </div>
                              {appointment.notes && (
                                <div className="mt-3 p-3 bg-white rounded border border-gray-100">
                                  <p className="text-gray-700">
                                    {appointment.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapPinIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function PhoneIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function MailIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function EditIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );
}

function CalendarDaysIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ChevronRightIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
