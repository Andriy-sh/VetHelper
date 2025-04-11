"use client";
import { User } from "@/lib/interface";
import { PawPrint, Search, Filter, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Clinics({
  clinics,
  user,
}: {
  clinics: {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
  }[];
  user: User;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(user.city || "");

  const cities = [...new Set(clinics.map((clinic) => clinic.city))];

  const filteredClinics = clinics.filter((clinic) => {
    const matchesSearch = clinic.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity ? clinic.city === selectedCity : true;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="h-screen bg-gradient-to-b from-white to-slate-200 p-4">
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-1/2 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Пошук клінік..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2 w-1/3 max-w-xs">
          <Filter className="h-5 w-5 text-gray-600" />
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Всі міста</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredClinics.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>Клінік не знайдено</p>
        </div>
      ) : (
        filteredClinics.map((clinic) => (
          <Link
            href={`/clinics/${clinic.id}`}
            key={clinic.id}
            className="flex space-x-3 mb-6 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-blue-100 p-3 rounded-full">
              <PawPrint className="text-blue-600" width={40} height={40} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-xl font-bold">{clinic.name}</p>
                <span className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  {clinic.city}
                </span>
              </div>
              <p className="mt-1 text-gray-700">{clinic.description}</p>
              <p className="mt-2 text-sm text-gray-500">{clinic.address}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
