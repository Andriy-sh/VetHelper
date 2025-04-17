"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clinic, ClinicImages, User } from "@/lib/interface";
import AddPostButton from "../addingClinicImages";
export default function Gallery({
  clinic,
  user,
  clinicImages,
}: {
  clinic: Clinic;
  user: User;
  clinicImages: ClinicImages[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 min-h-screen"
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
  );
}
