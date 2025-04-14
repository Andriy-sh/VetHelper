"use client";
import React, { useState } from "react";
import { AppointmentDialog } from "./appointmentDialog";
import Link from "next/link";
import AddPostButton from "./addingClinicImages";
import Image from "next/image";
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
import AddingClinicReviews from "./addingClinicReviews";
import AddingClinicFAQ from "./addingClinicFAQ";
import AddingClinicService from "./addingClinicService";
import AddingClinicNews from "./addingClinicNews";
import { motion } from "framer-motion";

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
  const [showAll, setShowAll] = useState(false);
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
        )}
        {view === "services" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-2xl font-bold text-gray-800 mb-4"
            >
              Послуги клініки
            </motion.h2>
            {clinic.id === user.clinicId && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mb-6"
              >
                <AddingClinicService clinicId={clinic.id} />
              </motion.div>
            )}
            {clinicServices.length > 0 ? (
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col justify-between"
                  >
                    <div>
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl font-semibold text-gray-800 mb-4"
                      >
                        {service.name}
                      </motion.h3>
                      {service.description ? (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="text-gray-600 mb-4"
                        >
                          {service.description}
                        </motion.p>
                      ) : (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="text-gray-600 mb-4"
                        >
                          Не вказано
                        </motion.p>
                      )}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="text-gray-800 mb-4"
                      >
                        <strong>Ціна: </strong>
                        {service.price ? `$${service.price}` : "Не вказано"}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="text-gray-800 mb-4"
                      >
                        <strong>Тривалість: </strong>
                        {service.duration
                          ? `${service.duration} хв`
                          : "Не вказано"}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className="text-gray-800 mb-4"
                      >
                        <strong>Категорія: </strong>
                        {service.category || "Не вказано"}
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                      className="flex items-center mt-4"
                    >
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">
                          {service.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(service.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-gray-600 text-center mt-4"
              >
                Наразі послуг немає. Будьте першими, хто додасть послугу!
              </motion.p>
            )}
          </motion.div>
        )}
        {view === "doctors" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          >
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className="w-32 h-32 mb-4"
                >
                  {doctor.image && doctor.image.startsWith("https") ? (
                    <Image
                      width={128}
                      height={128}
                      src={doctor.image ?? "/default-image.jpg"}
                      alt="User Avatar"
                      className="rounded-full object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      width={128}
                      height={128}
                      src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_200,h_200,c_thumb/${doctor.image}`}
                      alt="User Avatar"
                      className="rounded-full object-cover w-full h-full"
                    />
                  )}
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                  className="text-lg font-semibold text-gray-800"
                >
                  {doctor.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                  className="text-gray-600 text-sm"
                >
                  {doctor.email}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                  className="mt-4"
                >
                  <Link
                    href={`/clinics/${doctor.clinicId}/doctor/${doctor.id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Детальніше
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
        {view === "reviews" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-2xl font-bold text-gray-800 mb-4"
            >
              Відгуки клієнтів
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-6"
            >
              <AddingClinicReviews clinicId={clinic.id} userId={user.id} />
            </motion.div>
            {reviews.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
                  >
                    <motion.div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="text-gray-600 italic mb-4 text-lg leading-relaxed"
                      >
                        {review.comment}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="flex items-center justify-between mb-4"
                      >
                        <span className="text-sm text-gray-500 flex items-center">
                          Рейтинг:{" "}
                          <span className="font-semibold text-yellow-500 ml-1 flex items-center">
                            {review.rating}/5
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.3 }}
                              className="ml-1 text-yellow-400"
                            >
                              ★
                            </motion.span>
                          </span>
                        </span>
                        <span className="text-sm text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </motion.div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      className="flex items-center mt-4 space-x-4"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative w-12 h-12"
                      >
                        {review.user?.image &&
                        review.user?.image.startsWith("https") ? (
                          <Image
                            width={48}
                            height={48}
                            src={review.user?.image ?? "/default-image.jpg"}
                            alt="User Avatar"
                            className="rounded-full object-cover shadow-md"
                          />
                        ) : (
                          <Image
                            width={48}
                            height={48}
                            src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_200,h_200,c_thumb/${review.user?.image}`}
                            alt="User Avatar"
                            className="rounded-full object-cover shadow-md"
                          />
                        )}
                      </motion.div>
                      <div>
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                          className="text-sm font-medium text-gray-800"
                        >
                          {review.user?.name || "Анонім"}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 }}
                          className="text-sm text-gray-500"
                        >
                          {review.user?.email || "Електронна пошта недоступна"}
                        </motion.p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-600 text-center mt-4 text-lg"
              >
                Наразі відгуків немає. Будьте першим, хто залишить відгук!
              </motion.p>
            )}
          </motion.div>
        )}
        {view === "gallery" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-6"
            >
              {clinic.id === user.clinicId && <AddPostButton user={user} />}
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {clinicImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Image
                    width={400}
                    height={400}
                    src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_400,h_400,c_thumb/${image.url}`}
                    alt={image.title ?? "Фото клініки"}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  {image.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3"
                    >
                      <p className="text-sm font-medium">{image.title}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
        {view === "faq" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
          >
            {clinic.id === user.clinicId && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <AddingClinicFAQ clinicId={clinic.id} />
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-center mb-12"
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Часто задавані питання
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="text-lg text-gray-600"
              >
                Швидкі відповіді на питання, які можуть у вас виникнути.
              </motion.p>
            </motion.div>

            <motion.div className="space-y-8">
              {FAQ.slice(0, showAll ? FAQ.length : 5).map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  className="border-b border-gray-200 pb-8"
                >
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                    className="text-xl font-semibold text-gray-900 mb-3"
                  >
                    {question.question}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600"
                  >
                    {question.answer}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-12 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"
              >
                {showAll ? "Показати менше" : "Показати більше"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
        {view === "news" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-2xl font-bold text-gray-800 mb-4"
            >
              Новини та акції
            </motion.h2>
            {clinic.id === user.clinicId && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mb-6"
              >
                <AddingClinicNews
                  clinicId={clinic.id}
                  category={newsCategory}
                />
              </motion.div>
            )}
            {clinicNews.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {clinicNews.map((newsItem, index) => (
                  <motion.div
                    key={newsItem.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    }}
                    className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col justify-between hover:border-blue-500 transition-all duration-300"
                  >
                    <motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                        className="text-xl font-semibold text-gray-800 mb-4 hover:text-blue-600"
                      >
                        {newsItem.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                        className="text-gray-600 mb-4 line-clamp-3"
                      >
                        {newsItem.content}
                      </motion.p>
                      {newsItem.imageUrl && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + 0.3,
                          }}
                          whileHover={{ scale: 1.05 }}
                          className="overflow-hidden rounded-lg mb-4"
                        >
                          <Image
                            width={300}
                            height={200}
                            src={newsItem.imageUrl}
                            alt={newsItem.title}
                            className="rounded-lg object-cover w-full h-48 transform hover:scale-110 transition-transform duration-500"
                          />
                        </motion.div>
                      )}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                        className="text-blue-500 font-medium"
                      >
                        {newsItem?.category?.name}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                        className="text-gray-500 text-sm mt-2 italic"
                      >
                        {new Date(newsItem.createdAt).toLocaleDateString()}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-600 text-center mt-4 text-lg italic"
              >
                Наразі новин немає. Будьте першими, хто додасть новину!
              </motion.p>
            )}
          </motion.div>
        )}
        {view === "contact" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2"
            >
              Контактна інформація
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="space-y-4"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-blue-600 mr-2">📍</span>
                <div>
                  <span className="font-medium text-gray-700">Адреса:</span>
                  {clinic.address && clinic.city ? (
                    <span className="ml-2 text-gray-600">
                      {clinic.address}, {clinic.city}
                    </span>
                  ) : (
                    <span className="ml-2 text-gray-400 italic">
                      Адреса не вказана
                    </span>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-blue-600 mr-2">📞</span>
                <div>
                  <span className="font-medium text-gray-700">Телефон:</span>
                  {clinic.phone ? (
                    <span className="ml-2 text-gray-600">{clinic.phone}</span>
                  ) : (
                    <span className="ml-2 text-gray-400 italic">
                      Телефон не вказаний
                    </span>
                  )}
                </div>
              </motion.div>

              {(clinic.website && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-blue-600 mr-2">🌐</span>
                  <div>
                    <span className="font-medium text-gray-700">Вебсайт:</span>
                    <a
                      href={clinic.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      {clinic.website}
                    </a>
                  </div>
                </motion.div>
              )) || (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-blue-600 mr-2">🌐</span>
                  <div>
                    <span className="font-medium text-gray-700">Вебсайт:</span>
                    <span className="ml-2 text-gray-400 italic">
                      Вебсайт не вказаний
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
