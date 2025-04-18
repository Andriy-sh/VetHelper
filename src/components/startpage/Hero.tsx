"use client";
import { motion } from "framer-motion";
import { HeartIcon, ShieldCheckIcon } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-white to-slate-300 p-4">
      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-3 grid-rows-[auto,auto,auto] md:grid-rows-[1fr,2fr,2.5fr] gap-4 md:gap-0">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 md:col-span-3 text-center text-5xl md:text-7xl lg:text-9xl font-bold"
        >
          HAPPY <span className="font-serif">PET</span>
        </motion.div>

        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-2 p-4"
        >
          <HeartIcon className="w-8 h-8 text-rose-500" />
          <p className="text-base md:text-lg text-center">
            Турботливий{" "}
            <span className="text-rose-500 font-semibold">догляд</span> за
            вашими улюбленцями 24/7
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="row-span-1 md:row-span-2 flex justify-center items-center"
        >
          <Image
            className="rounded-b-full object-contain"
            width={400}
            height={500}
            alt="dog"
            src={"/hero_center.png"}
          />
        </motion.div>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-2 p-4"
        >
          <ShieldCheckIcon className="w-8 h-8 text-emerald-500" />
          <p className="text-base md:text-lg text-center">
            <span className="text-emerald-500 font-semibold">Професійні</span>{" "}
            ветеринарні послуги від найкращих спеціалістів
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden md:flex justify-center items-start"
        >
          <Image
            width={250}
            height={250}
            alt="dog"
            src={"/hero_right.png"}
            className="rounded-full w-48 h-48 md:w-64 md:h-64 object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden md:flex justify-center items-start"
        >
          <Image
            width={250}
            height={250}
            alt="dog"
            src={"/hero_left.png"}
            className="rounded-full w-48 h-48 md:w-64 md:h-64 object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
}
