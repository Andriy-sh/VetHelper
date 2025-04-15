"use client";
import { User } from "@/lib/interface";
import { PawPrint, Search, Filter, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen bg-gradient-to-b from-white to-slate-200 p-4"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex justify-between items-center"
      >
        <div className="relative w-1/2 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Пошук клінік..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2 w-1/3 max-w-xs">
          <Filter className="h-5 w-5 text-gray-600" />
          <motion.select
            whileFocus={{ scale: 1.02 }}
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
          </motion.select>
        </div>
      </motion.div>

      <AnimatePresence>
        {filteredClinics.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-10 text-gray-500"
          >
            <p>
              Клінік не знайдено в місті {user.city}, виберіть інше місто в
              фільтрі
            </p>

          </motion.div>
        ) : (
          <motion.div layout>
            {filteredClinics.map((clinic, index) => (
              <motion.div
                key={clinic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/clinics/${clinic.id}`}
                  className="flex space-x-3 mb-6 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="bg-blue-100 p-3 rounded-full"
                  >
                    <PawPrint
                      className="text-blue-600"
                      width={40}
                      height={40}
                    />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold"
                      >
                        {clinic.name}
                      </motion.p>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center text-sm text-gray-500"
                      >
                        <MapPin className="h-4 w-4 mr-1" />
                        {clinic.city}
                      </motion.span>
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-1 text-gray-700"
                    >
                      {clinic.description}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-2 text-sm text-gray-500"
                    >
                      {clinic.address}
                    </motion.p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
