"use client";
import { motion } from "framer-motion";
import AddingClinicService from "../addingClinicService";
import { Clinic } from "@prisma/client";
import { ClinicService, User } from "@/lib/interface";

export default function Services({
  clinic,
  user,
  clinicServices,
}: {
  clinic: Clinic;
  user: User;
  clinicServices: ClinicService[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6 min-h-screen"
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
                  {service.duration ? `${service.duration} хв` : "Не вказано"}
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
  );
}
