import { Blogs } from "@/lib/interface";
import Image from "next/image";
import Link from "next/link";

export default function BlogPostCard({ blogs }: { blogs: Blogs[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Link
          href={`/blogs/${blog.id}`}
          key={blog.id}
          className="max-w-md rounded-2xl overflow-hidden shadow-lg border border-gray-300 bg-white transition transform hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="relative w-full h-56">
            <Image
              fill
              src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_400,h_400,c_thumb/${blog.imageId}`}
              alt={blog.title ?? "Фото захворювання"}
              className="rounded-t-2xl object-cover"
            />
          </div>
          <div className="p-6">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-2">
              {blog.clinic.name}
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
              {blog.title}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {blog.content}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              {blog.isPublished ? (
                <span className="text-green-600 font-semibold">
                  Опубліковано
                </span>
              ) : (
                <span className="text-red-500 font-semibold">Чорновик</span>
              )}
            </div>
            <div className="mt-4">
              <button className="w-full px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg">
                Читати більше
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
