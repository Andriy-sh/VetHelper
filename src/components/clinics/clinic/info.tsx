"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AppointmentDialog } from "../appointmentDialog";
import { Appointment, Clinic, Pet } from "@/lib/interface";
import { User } from "@prisma/client";
import {
  CalendarDays,
  Users,
  PawPrint,
  Clock,
  MapPin,
  Phone,
  Globe,
  InfoIcon,
} from "lucide-react";
import EditClinicDialog from "./settings";

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
  const totalAppointments = appointments.length;
  const uniqueUsers = new Set(appointments.map((app) => app.userId)).size;
  const uniquePets = new Set(appointments.map((app) => app.petId)).size;
  const [clinicData, setClinicData] = useState(clinic);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 min-h-screen max-w-6xl mx-auto px-4 py-8"
    >
      {/* Clinic Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-8 text-center text-white"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          {clinicData.name}
        </h1>
        {clinicData.phone && (
          <div className="flex items-center justify-center gap-2 text-blue-100">
            <Phone size={18} />
            <p className="text-lg">{clinicData.phone}</p>
          </div>
        )}
        <motion.div
          className="flex justify-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
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
        <div className="absolute top-0 right-0">
          {user.clinicId === clinic.id && (
            <EditClinicDialog clinic={clinic} setClinicData={setClinicData} />
          )}
        </div>
      </motion.div>

      {/* Statistics Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<CalendarDays className="text-blue-500" size={24} />}
          value={totalAppointments}
          label="Усього записів"
        />
        <StatCard
          icon={<Users className="text-blue-500" size={24} />}
          value={uniqueUsers}
          label="Унікальних клієнтів"
        />
        <StatCard
          icon={<PawPrint className="text-blue-500" size={24} />}
          value={uniquePets}
          label="Тварин обслуговано"
        />
      </div>

      {/* Contact Information & Metadata Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 lg:col-span-2"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="text-blue-500" size={20} />
            Контактна інформація
          </h2>

          <div className="space-y-4">
            <InfoItem
              icon={<MapPin size={18} className="text-gray-500" />}
              label="Адреса"
              value={`${clinicData.address}, ${clinicData.city}`}
            />

            {clinicData.description && (
              <InfoItem
                icon={<InfoIcon size={18} className="text-gray-500" />}
                label="Опис"
                value={clinicData.description}
              />
            )}

            {clinicData.phone && (
              <InfoItem
                icon={<Phone size={18} className="text-gray-500" />}
                label="Телефон"
                value={clinicData.phone}
              />
            )}

            {clinicData.website && (
              <InfoItem
                icon={<Globe size={18} className="text-gray-500" />}
                label="Вебсайт"
                value={
                  <a
                    href={clinicData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {clinicData.website}
                  </a>
                }
              />
            )}
          </div>
        </motion.div>

        {/* Metadata Info */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="text-blue-500" size={20} />
            Метадані
          </h2>

          <div className="space-y-4">
            <InfoItem
              label="Створено"
              value={new Date(clinicData.createdAt).toLocaleDateString(
                "uk-UA",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            />

            <InfoItem
              label="Оновлено"
              value={new Date(clinicData.updatedAt).toLocaleDateString(
                "uk-UA",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 text-center"
    >
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
    </motion.div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500 flex items-center gap-2">
        {icon && icon}
        {label}
      </p>
      <p className="text-gray-800 mt-1">{value}</p>
    </div>
  );
}
