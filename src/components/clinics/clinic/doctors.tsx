"use client";
import { User } from "@/lib/interface";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Doctors({ doctors }: { doctors: User[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
    >
      {doctors.map((doctor, index) => (
        <motion.div
          key={doctor.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center text-center transition-all duration-300 ease-in-out"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
            className="w-32 h-32 mb-4"
          >
            <Image
              width={128}
              height={128}
              src={
                doctor.image?.startsWith("https")
                  ? doctor.image
                  : `https://res.cloudinary.com/dddgmovz2/image/upload/w_200,h_200,c_thumb/${doctor.image}`
              }
              alt="User Avatar"
              className="rounded-full object-cover w-full h-full"
              placeholder="blur"
              blurDataURL="/default-image.jpg"
            />
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
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Детальніше
            </Link>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
