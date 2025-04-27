"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Іконки для бургер-меню
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
  const [menuOpen, setMenuOpen] = useState(false); // Стан для бургер-меню

  const sections = [
    { id: "info", label: "Основна інформація" },
    { id: "services", label: "Послуги" },
    { id: "doctors", label: "Спеціалісти" },
    { id: "reviews", label: "Відгуки" },
    { id: "gallery", label: "Фотогалерея" },
    { id: "faq", label: "Часті питання" },
    { id: "news", label: "Новини та акції" },
    { id: "contact", label: "Контакти" },
  ];

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
          <button
            className="text-blue-500 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Бургер-меню для мобільних пристроїв */}
        {menuOpen && (
          <div className="bg-blue-100 p-4 rounded-lg mb-6 md:hidden">
            <ul className="space-y-4">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-lg transition duration-300 ${
                      view === section.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => {
                      setView(section.id);
                      setMenuOpen(false); // Закриваємо меню після вибору
                    }}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Навігація для великих екранів */}
        <div className="hidden md:flex flex-wrap w-auto flex-row justify-center space-x-4 mb-6">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`px-4 py-2 rounded-lg transition duration-300 ${
                view === section.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setView(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Вміст розділів */}
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
