"use client";
import { Clinic } from "@/lib/interface";
import { motion } from "framer-motion";
export default function Contact({ clinic }: { clinic: Clinic }) {
  return (
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
  );
}
