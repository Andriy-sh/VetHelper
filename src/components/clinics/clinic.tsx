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
import { motion, AnimatePresence } from "framer-motion";
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-gray-100"
      >
        <div className="p-8">
          {clinic.id === user.clinicId && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                href={`/clinics/${clinic.id}/dashboard`}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 w-fit"
              >
                <motion.span
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  Перегляд прийомів
                </motion.span>
              </Link>
            </motion.div>
          )}

          <motion.div
            className="flex flex-wrap gap-4 mb-8"
            variants={containerVariants}
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
            ].map((section) => (
              <motion.button
                key={section}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium
                  ${
                    view === section
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
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

          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white min-h-[70vh] rounded-xl shadow-sm p-6"
            >
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
                <Gallery
                  clinic={clinic}
                  clinicImages={clinicImages}
                  user={user}
                />
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
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
