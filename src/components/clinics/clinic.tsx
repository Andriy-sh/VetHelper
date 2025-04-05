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
    <div className="min-h-[90vh] min-w-[90vh] p-8 bg-gray-50 flex items-center justify-center">
      <div className="min-h-[80vh] w-full bg-white shadow-2xl rounded-lg overflow-hidden p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">{clinic.name}</h1>
          {clinic.id === user.clinicId && (
            <Link
              href={`/clinics/${clinic.id}/dashboard`}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Перегляд прийомів
            </Link>
          )}
        </div>

        <div className="flex space-x-4 mb-6">
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
            </button>
          ))}
        </div>

        {view === "info" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 text-center">
                  Контактна інформація
                </h2>
                <div className="text-gray-600">
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
                </div>
                {clinic.phone && (
                  <p className="text-gray-600">
                    <span className="font-medium">Телефон:</span> {clinic.phone}
                  </p>
                )}
                {clinic.website && (
                  <p className="text-gray-600">
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
                  </p>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 text-center">
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
              <div className="mt-8">
                <AppointmentDialog
                  name={clinic.name}
                  clinicId={clinic.id}
                  userId={user.id}
                  times={appointments.map((a) => a.time)}
                  date={appointments.map((a) => a.date.toISOString())}
                  pets={pets}
                />
              </div>
            </div>
          </div>
        )}

        {view === "services" && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Послуги клініки
            </h2>
            {clinic.id === user.clinicId && (
              <div className="mb-6">
                <AddingClinicService clinicId={clinic.id} />
              </div>
            )}
            {clinicServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {service.name}
                      </h3>
                      {service.description ? (
                        <p className="text-gray-600 mb-4">
                          {service.description}
                        </p>
                      ) : (
                        <p className="text-gray-600 mb-4">Не вказано</p>
                      )}
                      {service.price ? (
                        <div className="text-gray-800 mb-4">
                          <strong>Ціна: </strong>${service.price}
                        </div>
                      ) : (
                        <div className="text-gray-800 mb-4">
                          <strong>Ціна: </strong>Не вказано
                        </div>
                      )}
                      {service.duration ? (
                        <div className="text-gray-800 mb-4">
                          <strong>Тривалість: </strong>
                          {service.duration} хв
                        </div>
                      ) : (
                        <div className="text-gray-800 mb-4">
                          <strong>Тривалість: </strong>Не вказано
                        </div>
                      )}
                      {service.category ? (
                        <div className="text-gray-800 mb-4">
                          <strong>Категорія: </strong>
                          {service.category}
                        </div>
                      ) : (
                        <div className="text-gray-800 mb-4">
                          <strong>Категорія: </strong>Не вказано
                        </div>
                      )}
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">
                          {service.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(service.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center mt-4">
                Наразі послуг немає. Будьте першими, хто додасть послугу!
              </p>
            )}
          </div>
        )}

        {view === "doctors" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center text-center"
              >
                <div className="w-32 h-32 mb-4">
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
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {doctor.name}
                </h3>
                <p className="text-gray-600 text-sm">{doctor.email}</p>
                <Link
                  href={`/clinics/${doctor.clinicId}/doctor/${doctor.id}`}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Детальніше
                </Link>
              </div>
            ))}
          </div>
        )}

        {view === "reviews" && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Відгуки клієнтів
            </h2>
            <div className="mb-6">
              <AddingClinicReviews clinicId={clinic.id} userId={user.id} />
            </div>
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-gray-600 italic mb-4">
                        {review.comment}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">
                          Рейтинг:{" "}
                          <span className="font-semibold text-yellow-500">
                            {review.rating}/5
                          </span>
                        </span>
                        <span className="text-sm text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      {review.user?.image &&
                      review.user?.image.startsWith("https") ? (
                        <Image
                          width={40}
                          height={40}
                          src={review.user?.image ?? "/default-image.jpg"}
                          alt="User Avatar"
                          className="rounded-full object-cover "
                        />
                      ) : (
                        <Image
                          width={40}
                          height={40}
                          src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_200,h_200,c_thumb/${review.user?.image}`}
                          alt="User Avatar"
                          className="rounded-full object-cover "
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {review.user?.name || "Анонім"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {review.user?.email || "Електронна пошта недоступна"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center mt-4">
                Наразі відгуків немає. Будьте першим, хто залишить відгук!
              </p>
            )}
          </div>
        )}

        {view === "gallery" && (
          <div>
            {clinic.id === user.clinicId && <AddPostButton user={user} />}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {clinicImages.map((image) => (
                <div key={image.id} className="text-center">
                  <Image
                    width={200}
                    height={200}
                    src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_400,h_400,c_thumb/${image.url}`}
                    alt={image.title ?? "Фото клініки"}
                    className="rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "faq" && (
          <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {clinic.id === user.clinicId && (
              <AddingClinicFAQ clinicId={clinic.id} />
            )}
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Часто задавані питання
              </h1>
              <p className="text-lg text-gray-600">
                Швидкі відповіді на питання, які можуть у вас виникнути.
              </p>
            </div>

            <div className="space-y-8">
              {FAQ.slice(0, showAll ? FAQ.length : 5).map((question, index) => (
                <div key={index} className="border-b border-gray-200 pb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {question.question}
                  </h3>
                  <p className="text-gray-600">{question.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300"
              >
                {showAll ? "Показати менше" : "Показати більше"}
              </button>
            </div>
          </div>
        )}
        {view === "news" && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Новини та акції
            </h2>
            {clinic.id === user.clinicId && (
              <div className="mb-6">
                <AddingClinicNews
                  clinicId={clinic.id}
                  category={newsCategory}
                />
              </div>
            )}
            {clinicNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicNews.map((newsItem) => (
                  <div
                    key={newsItem.id}
                    className="bg-white shadow-md rounded-lg p-6 border border-black flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {newsItem.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{newsItem.content}</p>
                      {newsItem.imageUrl && (
                        <Image
                          width={300}
                          height={200}
                          src={newsItem.imageUrl}
                          alt={newsItem.title}
                          className="rounded-lg object-cover mb-4"
                        />
                      )}
                      <p>{newsItem?.category?.name}</p>
                      <div className="text-gray-500 text-sm mt-2">
                        {new Date(newsItem.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center mt-4">
                Наразі новин немає. Будьте першими, хто додасть новину!
              </p>
            )}
          </div>
        )}

        {view === "contact" && (
          <div>
            <p className="text-gray-600">
              <span className="font-medium">Адреса:</span> {clinic.address},{" "}
              {clinic.city}
            </p>
            {clinic.phone && (
              <p className="text-gray-600">
                <span className="font-medium">Телефон:</span> {clinic.phone}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
