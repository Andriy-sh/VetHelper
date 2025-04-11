import { HeartIcon, ShieldCheckIcon } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-screen justify-center flex items-center bg-gradient-to-b from-white to-slate-300 ">
      <div className="grid grid-cols-3 grid-rows-[1fr,2fr,2fr] w-[1000px] h-[800px]">
        <div className="col-span-3 text-center text-9xl font-bold">
          HAPPY <span className="font-serif">PET</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4">
          <HeartIcon className="w-8 h-8 text-rose-500" />
          <p className="text-lg text-center">
            Турботливий{" "}
            <span className="text-rose-500 font-semibold">догляд</span> за
            вашими улюбленцями 24/7
          </p>
        </div>
        <Image
          className="row-span-2 rounded-b-full"
          width={500}
          height={700}
          alt="dog"
          src={"/hero_center.png"}
        />
        <div className="flex flex-col items-center gap-2 p-4">
          <ShieldCheckIcon className="w-8 h-8 text-emerald-500" />
          <p className="text-lg text-center">
            <span className="text-emerald-500 font-semibold">Професійні</span>{" "}
            ветеринарні послуги від найкращих спеціалістів
          </p>
        </div>

        <div className="flex justify-center items-start">
          <Image width={200} height={200} alt="dog" src={"/hero_left.png"} />
        </div>
        <div className="flex justify-center items-start">
          <Image width={200} height={200} alt="dog" src={"/hero_right.png"} />
        </div>
      </div>
    </div>
  );
}
