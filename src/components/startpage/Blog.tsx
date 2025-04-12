"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  category: {
    name: string;
    color: {
      bg: string;
      text: string;
    };
  };
  author: {
    initials: string;
    name: string;
    date: string;
    color: {
      bg: string;
      text: string;
      ring: string;
    };
  };
  readTime: string;
}

export default function Blog() {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Правильне харчування вашого улюбленця",
      description:
        "Поради щодо збалансованого раціону для здоров'я вашої тварини",
      image: {
        src: "/healthy.png",
        alt: "Здорове харчування",
      },
      category: {
        name: "Здоров'я",
        color: {
          bg: "bg-blue-100",
          text: "text-blue-600",
        },
      },
      author: {
        initials: "ОК",
        name: "Др. Ковальчук",
        date: "15 Лютого 2024",
        color: {
          bg: "bg-blue-100",
          text: "text-blue-600",
          ring: "ring-blue-50",
        },
      },
      readTime: "7 хв",
    },
    {
      id: 2,
      title: "Ознаки стресу у домашніх тварин",
      description: "Як розпізнати тривожність у вашого улюбленця",
      image: {
        src: "/behavior.png",
        alt: "Поведінка тварин",
      },
      category: {
        name: "Поведінка",
        color: {
          bg: "bg-purple-100",
          text: "text-purple-600",
        },
      },
      author: {
        initials: "МП",
        name: "Др. Петренко",
        date: "11 Січня 2024",
        color: {
          bg: "bg-purple-100",
          text: "text-purple-600",
          ring: "ring-purple-50",
        },
      },
      readTime: "5 хв",
    },
    {
      id: 3,
      title: "Базові команди для собак",
      description: "Ефективні методи навчання вашого собаки",
      image: {
        src: "/training.png",
        alt: "Тренування собак",
      },
      category: {
        name: "Тренування",
        color: {
          bg: "bg-green-100",
          text: "text-green-600",
        },
      },
      author: {
        initials: "ВЛ",
        name: "Василь Лисенко",
        date: "22 Березня 2024",
        color: {
          bg: "bg-green-100",
          text: "text-green-600",
          ring: "ring-green-50",
        },
      },
      readTime: "6 хв",
    },
  ];
  const { ref, inView } = useInViewOnce();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-400 to-neutral-200">
      <div className="container mx-auto px-8 py-16">
        <div className="flex justify-between items-center mb-5">
          <motion.h1
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="font-bold text-5xl text-gray-800"
          >
            Блог
          </motion.h1>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors"
          >
            <Link href="/blog"> Переглянути все</Link>
            <motion.span
              initial={{ rotate: 0 }}
              whileInView={{ rotate: 360 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </motion.div>
        </div>

        <div className="pb-6">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            Корисні поради для власників домашніх тварин
          </motion.h2>
          <motion.p
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xl text-gray-600"
          >
            Дізнайтеся більше про догляд та здоров&apos;я ваших улюбленців
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
              exit={{ opacity: 0, y: 40 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl flex flex-col items-center p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group border border-gray-100"
            >
              <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                <Image
                  width={400}
                  height={300}
                  alt={post.image.alt}
                  src={post.image.src}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <span
                  className={`absolute bottom-3 left-3 text-sm ${post.category.color.bg} ${post.category.color.text} font-semibold px-4 py-1 rounded-full backdrop-blur-sm`}
                >
                  {post.category.name}
                </span>
              </div>

              <h2
                className={`font-bold text-2xl text-gray-800 mt-2 text-center group-hover:${post.category.color.text} transition-colors`}
              >
                {post.title}
              </h2>
              <p className="text-lg text-gray-600 mt-3 text-center line-clamp-2">
                {post.description}
              </p>

              <div className="flex items-center justify-between mt-6 w-full pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${post.author.color.bg} rounded-full flex items-center justify-center ring-4 ${post.author.color.ring}`}
                  >
                    <span className={post.author.color.text}>
                      {post.author.initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {post.author.name}
                    </p>
                    <p className="text-sm text-gray-500">{post.author.date}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  {post.readTime}
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
