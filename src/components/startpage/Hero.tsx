"use client";
import { motion } from "framer-motion";
import { HeartIcon, ShieldCheckIcon } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-screen justify-center flex items-center bg-gradient-to-b from-white to-slate-300 ">
      <div className="grid grid-cols-3 grid-rows-[1fr,2fr,2.5fr] w-[1000px] h-[800px]">
        <Image
          alt=""
          src={"/cloudcat.png"}
          width={300}
          height={300}
          className="absolute top-20 left-10"
        />
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-3 text-center text-9xl font-bold"
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
          <p className="text-lg text-center">
            Турботливий
            <span className="text-rose-500 font-semibold">догляд</span> за
            вашими улюбленцями 24/7
          </p>
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="row-span-2 "
        >
          <Image
            className="row-span-2 rounded-b-full"
            width={500}
            height={700}
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
          <p className="text-lg text-center">
            <span className="text-emerald-500 font-semibold">Професійні</span>{" "}
            ветеринарні послуги від найкращих спеціалістів
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center items-start rounded-full"
        >
          <Image
            width={300}
            height={300}
            alt="dog"
            src={"/mavik.png"}
            className="rounded-full  w-64 h-64 object-contain"
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center items-start"
        >
          <Image
            width={300}
            height={300}
            alt="dog"
            src={"/nanochka.png"}
            className="rounded-full   w-64 h-64 object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
}
