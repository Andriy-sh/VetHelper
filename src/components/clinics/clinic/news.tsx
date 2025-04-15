"use client";
import { motion } from "framer-motion";
import AddingClinicNews from "../addingClinicNews";
import Image from "next/image";
import { Clinic, ClinicNews, ClinicNewsCategory, User } from "@/lib/interface";

export default function News({
  clinic,
  user,
  newsCategory,
  clinicNews,
}: {
  clinic: Clinic;
  user: User;
  newsCategory: ClinicNewsCategory[];
  clinicNews: ClinicNews[];
}) {
  return (
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
          <AddingClinicNews clinicId={clinic.id} category={newsCategory} />
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
  );
}
