"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Appointment,
  Clinic,
  ClinicFAQ,
  ClinicImages,
  ClinicNews,
  ClinicNewsCategory,
  ClinicReviews,
  ClinicService,
  Pet,
  User,
} from "@/lib/interface";
import { motion } from "framer-motion";
import Info from "./clinic/info";
import Services from "./clinic/services";
import Doctors from "./clinic/doctors";
import Reviews from "./clinic/reviews";
import Gallery from "./clinic/gallery";
import Faq from "./clinic/faq";
import News from "./clinic/news";
import Contact from "./clinic/contact";

export default function SingleClinic({
  clinic,
  user,
  pets,
  clinicImages,
  appointments,
  doctors,
  reviews,
  FAQ,
  clinicServices,
  newsCategory,
  clinicNews,
}: {
  clinic: Clinic;
  user: User;
  pets: Pet[];
  clinicImages: ClinicImages[];
  appointments: Appointment[];
  doctors: User[];
  reviews: ClinicReviews[];
  FAQ: ClinicFAQ[];
  clinicServices: ClinicService[];
  newsCategory: ClinicNewsCategory[];
  clinicNews: ClinicNews[];
}) {
  const [view, setView] = useState("info");
  return (
    <div className="min-h-screen min-w-[90vh] p-8 bg-gray-50 flex items-center justify-center">
      <div className="min-h-[80vh] w-full bg-white shadow-2xl rounded-lg overflow-hidden p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex justify-between items-center mb-6"
        >
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="text-4xl font-bold text-gray-800"
          >
            {clinic.name}
          </motion.h1>
          {clinic.id === user.clinicId && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1, delay: 0.1 }}
            >
              <Link
                href={`/clinics/${clinic.id}/dashboard`}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Перегляд прийомів
              </Link>
            </motion.div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="flex space-x-4 mb-6"
        >
          {[
            "info",
            "services",
            "doctors",
            "reviews",
            "gallery",
            "faq",
            "news",
            "contact",
          ].map((section, index) => (
            <motion.button
              key={section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg transition duration-300 ${
                view === section ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setView(section)}
            >
              {section === "info" && "Основна інформація"}
              {section === "services" && "Послуги"}
              {section === "doctors" && "Спеціалісти"}
              {section === "reviews" && "Відгуки"}
              {section === "gallery" && "Фотогалерея"}
              {section === "faq" && "Часті питання"}
              {section === "news" && "Новини та акції"}
              {section === "contact" && "Контакти"}
            </motion.button>
          ))}
        </motion.div>
        {view === "info" && (
          <Info
            appointments={appointments}
            clinic={clinic}
            pets={pets}
            user={user}
          />
        )}
        {view === "services" && (
          <Services
            clinic={clinic}
            clinicServices={clinicServices}
            user={user}
          />
        )}
        {view === "doctors" && <Doctors doctors={doctors} />}
        {view === "reviews" && (
          <Reviews clinic={clinic} reviews={reviews} user={user} />
        )}
        {view === "gallery" && (
          <Gallery clinic={clinic} clinicImages={clinicImages} user={user} />
        )}
        {view === "faq" && <Faq FAQ={FAQ} clinic={clinic} user={user} />}
        {view === "news" && (
          <News
            clinic={clinic}
            clinicNews={clinicNews}
            newsCategory={newsCategory}
            user={user}
          />
        )}
        {view === "contact" && <Contact clinic={clinic} />}
      </div>
    </div>
  );
}
