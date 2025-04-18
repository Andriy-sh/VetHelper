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
import Contact from "./clinic/contact";
import News from "./clinic/news";
import Faq from "./clinic/faq";
import Gallery from "./clinic/gallery";
import Reviews from "./clinic/reviews";
import Doctors from "./clinic/doctors";
import Services from "./clinic/services";
import Info from "./clinic/info";

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
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50 flex items-center justify-center">
      <div className="min-h-[80vh] w-full bg-white shadow-2xl rounded-lg overflow-hidden p-4 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          {clinic.id === user.clinicId && (
            <Link
              href={`/clinics/${clinic.id}/dashboard`}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Перегляд прийомів
            </Link>
          )}
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center space-x-4 mb-6 sm:space-x-0 sm:space-y-4 sm:flex-col">
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
            <button
              key={section}
              className={`px-4 py-2 rounded-lg transition duration-300 w-full sm:w-auto ${
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
            </button>
          ))}
        </div>

        {/* Content Sections */}
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
