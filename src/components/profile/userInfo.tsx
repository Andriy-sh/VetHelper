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
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="min-h-screen w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative w-32 h-32">
            <ChangeAvatar
              width={100}
              height={100}
              userIds={user.id}
              imageId={user.image || ""}
              change={true}
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            {user.name || "Guest"}
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            {user.email || "No email available"}
          </p>
          <p className="text-gray-600">{user.city}</p>
          <Link
            href={`/profile/${user.id}`}
            className="mt-4 text-blue-500 hover:text-blue-700 transition-colors"
          >
            Go to the moon
          </Link>
        </div>

        <div className="flex-1">
          {appointment.length === 0 ? (
            <p className="text-gray-600">No appointments found.</p>
          ) : (
            <div className="space-y-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-4xl">
                    Ваші відвідування
                  </AccordionTrigger>
                  <AccordionContent>
                    {appointment.map((appointment) => (
                      <Link
                        key={appointment.id}
                        href={`/clinics/${appointment.clinicId}/${appointment.id}`}
                      >
                        <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex flex-col space-y-2">
                            <p className="text-lg font-semibold text-gray-800">
                              Clinic:{" "}
                              <span className="font-normal">
                                {clinics.find(
                                  (clinic) => clinic.id === appointment.clinicId
                                )?.name || "Unknown Clinic"}
                              </span>
                            </p>
                            <p className="text-lg font-semibold text-gray-800">
                              Time:{" "}
                              <span className="font-normal">
                                {appointment.time}
                              </span>
                            </p>
                            <p className="text-lg font-semibold text-gray-800">
                              Notes:{" "}
                              <span className="font-normal">
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
          )}
        </div>
      </div>
    </div>
  );
}
