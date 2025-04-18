"use client";
import Image from "next/image";
import { Blogs, User } from "@/lib/interface";
import { useState, useEffect } from "react";

export default function BlogInfo({ blog, user }: { blog: Blogs; user: User }) {
  const [liked, setLiked] = useState(false);

  // Check if the user has already liked the post
  useEffect(() => {
    const checkIfLiked = async () => {
      const response = await fetch(
        `/api/likes/check?userId=${user.id}&postId=${blog.id}`
      );
      const data = await response.json();
      setLiked(data.liked);
    };

    checkIfLiked();
  }, [blog.id, user.id]);

  //   const handleLikePost = async () => {
  //     if (liked) {
  //       await deleteLikePost(user.id, blog.id);
  //       setLiked(false);
  //     } else {
  //       await likePost(user.id, blog.id);
  //       setLiked(true);
  //     }
  //   };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
      {blog.imageId && (
        <Image
          width={800}
          height={400}
          src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_800,h_400,c_thumb/${blog.imageId}`}
          alt={blog.title}
          className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover"
        />
      )}
      <div className="p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          {blog.title}
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Опубліковано: {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mt-4">
          {blog.content}
        </p>
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Інформація про клініку
          </h2>
          <p className="text-gray-600">Назва: {blog.clinic.name}</p>
          <p className="text-gray-600">Місто: {blog.clinic.city}</p>
          <p className="text-gray-600">Адреса: {blog.clinic.address}</p>
          {blog.clinic.phone && (
            <p className="text-gray-600">Телефон: {blog.clinic.phone}</p>
          )}
          {blog.clinic.website && (
            <a
              href={blog.clinic.website}
              className="text-blue-500 hover:underline"
              target="_blank"
            >
              Вебсайт клініки
            </a>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between border-t pt-4">
          <button
            className="text-gray-700 flex items-center space-x-2"
            // onClick={handleLikePost}
          >
            <span className="text-lg">{liked ? "❤️" : "👍"}</span>
            <span>{liked ? "Видалити лайк" : "Лайкнути"}</span>
          </button>
        </div>

        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Коментарі
          </h2>
          <textarea
            className="w-full border p-2 rounded-lg mt-2"
            placeholder="Напишіть коментар..."
          ></textarea>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Відправити
          </button>
        </div>
      </div>
    </div>
  );
}
