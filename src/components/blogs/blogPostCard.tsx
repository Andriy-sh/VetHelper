import { Blogs } from "@/lib/interface";
import Image from "next/image";

export default function BlogPostCard({ blogs }: { blogs: Blogs[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="max-w-sm rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white"
        >
          <div className="relative w-full h-48">
            <Image
              src="/placeholder.jpg"
              alt={blog.title}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {blog.clinic.name}
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {blog.title}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {blog.content}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
              {blog.isPublished ? (
                <span className="text-xs text-green-500">Опубліковано</span>
              ) : (
                <span className="text-xs text-red-500">Чорновик</span>
              )}
            </div>
            <div className="mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                Читати більше
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
