"use client";
import { Clinic, ClinicFAQ, User } from "@/lib/interface";
import { motion } from "framer-motion";
import AddingClinicFAQ from "../addingClinicFAQ";
import { useState } from "react";
export default function Faq({
  clinic,
  user,
  FAQ,
}: {
  clinic: Clinic;
  user: User;
  FAQ: ClinicFAQ[];
}) {
  const [showAll, setShowAll] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl min-h-screen mx-auto px-4 py-12 sm:px-6 lg:px-8"
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
  );
}
