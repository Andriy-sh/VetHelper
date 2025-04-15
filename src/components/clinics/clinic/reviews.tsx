"use client";
import { motion } from "framer-motion";
import AddingClinicReviews from "../addingClinicReviews";
import Image from "next/image";
import { Clinic, ClinicReviews, User } from "@/lib/interface";

export default function Reviews({
  clinic,
  reviews,
  user,
}: {
  clinic: Clinic;
  reviews: ClinicReviews[];
  user: User;
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
        Відгуки клієнтів
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mb-6"
      >
        <AddingClinicReviews clinicId={clinic.id} userId={user.id} />
      </motion.div>
      {reviews.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-gray-600 italic mb-4 text-lg leading-relaxed"
                >
                  {review.comment}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-center justify-between mb-4"
                >
                  <span className="text-sm text-gray-500 flex items-center">
                    Рейтинг:{" "}
                    <span className="font-semibold text-yellow-500 ml-1 flex items-center">
                      {review.rating}/5
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="ml-1 text-yellow-400"
                      >
                        ★
                      </motion.span>
                    </span>
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex items-center mt-4 space-x-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative w-12 h-12"
                >
                  {review.user?.image &&
                  review.user?.image.startsWith("https") ? (
                    <Image
                      width={48}
                      height={48}
                      src={review.user?.image ?? "/default-image.jpg"}
                      alt="User Avatar"
                      className="rounded-full object-cover shadow-md"
                    />
                  ) : (
                    <Image
                      width={48}
                      height={48}
                      src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_200,h_200,c_thumb/${review.user?.image}`}
                      alt="User Avatar"
                      className="rounded-full object-cover shadow-md"
                    />
                  )}
                </motion.div>
                <div>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="text-sm font-medium text-gray-800"
                  >
                    {review.user?.name || "Анонім"}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="text-sm text-gray-500"
                  >
                    {review.user?.email || "Електронна пошта недоступна"}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-600 text-center mt-4 text-lg"
        >
          Наразі відгуків немає. Будьте першим, хто залишить відгук!
        </motion.p>
      )}
    </motion.div>
  );
}
