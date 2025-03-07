import React from "react";

export default function SingleClinic({
  clinic,
}: {
  clinic: {
    name: string;
    description: string;
    address: string;
    phone: string;
    city: string;
    website: string;
    updatedAt: string;
    createdAt: string;
  };
}) {
  return (
    <div className="min-h-[90vh] min-w-[90vh] p-8 bg-gray-50 flex items-center justify-center">
      <div className="min-h-[80vh] w-full bg-white shadow-2xl rounded-lg overflow-hidden ">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {clinic.name}
          </h1>
          <p className="text-gray-600 mb-6 text-lg">{clinic.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4">
              <h2 className="text-2xl flex justify-center font-semibold text-gray-700 border-b-2 border-blue-500 pb-2">
                Контактна інформація
              </h2>
              <p className="text-gray-600">
                <span className="font-medium">Адреса:</span> {clinic.address},{" "}
                {clinic.city}
              </p>
              {clinic.phone && (
                <p className="text-gray-600">
                  <span className="font-medium">Телефон:</span> {clinic.phone}
                </p>
              )}
              {clinic.website && (
                <p className="text-gray-600">
                  <span className="font-medium">Вебсайт:</span>{" "}
                  <a
                    href={clinic.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {clinic.website}
                  </a>
                </p>
              )}
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2">
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
          </div>
          <div className="mt-12  flex justify-center">Записатися</div>
        </div>
      </div>
    </div>
  );
}
