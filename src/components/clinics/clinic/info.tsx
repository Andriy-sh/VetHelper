"use client";

import React from "react";
import { motion } from "framer-motion";
import { Appointment, Clinic, Pet, User } from "@/lib/interface";
import { AppointmentDialog } from "../appointmentDialog";

export default function Info({
  clinic,
  user,
  appointments,
  pets,
}: {
  clinic: Clinic;
  user: User;
  appointments: Appointment[];
  pets: Pet[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 text-center">
            Контактна інформація
          </h2>
          <motion.div
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div>
              <span className="font-medium">Адреса:</span>{" "}
              <span>
                {clinic.address}, {clinic.city}
              </span>
            </div>
            <div>
              <span className="font-medium"> Опис:</span>{" "}
              <span>{clinic.description}</span>
            </div>
          </motion.div>
          {clinic.phone && (
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <span className="font-medium">Телефон:</span> {clinic.phone}
            </motion.p>
          )}
          {clinic.website && (
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
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
            </motion.p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 text-center">
            Додаткова інформація
          </h2>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <span className="font-medium">Створено:</span>{" "}
            {new Date(clinic.createdAt).toLocaleDateString()}
          </motion.p>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <span className="font-medium">Оновлено:</span>{" "}
            {new Date(clinic.updatedAt).toLocaleDateString()}
          </motion.p>
        </motion.div>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <AppointmentDialog
            name={clinic.name}
            clinicId={clinic.id}
            userId={user.id}
            times={appointments.map((a) => a.time)}
            date={appointments.map((a) => a.date.toISOString())}
            pets={pets}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
