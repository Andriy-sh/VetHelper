import Image from "next/image";
import { prisma } from "../../../../prisma";

type Params = Promise<{ id: string }>;

export default async function page({ params }: { params: Params }) {
  const resolvedParams = await params;

  const blog = await prisma.blogPost.findUnique({
    where: { id: resolvedParams.id },
    include: {
      clinic: true,
      user: true,
      category: true,
      comments: {
        include: {
          user: true,
        },
      },
      likes: true,
    },
  });

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        Блог не знайдено
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-8">
        {blog.imageId && (
          <div className="relative flex justify-center items-center  overflow-hidden">
            <Image
              src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_400,h_400,c_fill/${blog.imageId}`}
              alt={blog.title ?? "Фото захворювання"}
              width={400}
              height={400}
            />
          </div>
        )}

        {/* Заголовок і статус */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>
          <div className="mt-2 text-sm text-gray-500 flex flex-wrap gap-4">
            <span>
              📅 Створено: {new Date(blog.createdAt).toLocaleDateString()}
            </span>
            <span>
              🕓 Оновлено: {new Date(blog.updatedAt).toLocaleDateString()}
            </span>
            <span>
              {blog.isPublished ? (
                <span className="text-green-600 font-semibold">
                  ✅ Опубліковано
                </span>
              ) : (
                <span className="text-red-500 font-semibold">📝 Чернетка</span>
              )}
            </span>
            <span>❤️ {blog.likes.length} лайків</span>
          </div>
        </div>

        {/* Контент */}
        <div className="prose prose-lg max-w-none text-gray-800">
          <p>{blog.content}</p>
        </div>

        {/* Автор */}
        <div className="bg-slate-50 p-6 rounded-xl shadow-inner">
          <h3 className="text-lg font-semibold mb-2">👤 Автор</h3>
          <div className="flex items-center gap-4">
            <div>
              <p className="font-medium">
                {blog.user.surname} {blog.user.name}
              </p>
              <p className="text-sm text-gray-500">
                @{blog.user.username} · {blog.user.email}
              </p>
              {blog.user.city && (
                <p className="text-sm">Місто: {blog.user.city}</p>
              )}
            </div>
          </div>
        </div>

        {/* Клініка */}
        <div className="bg-slate-50 p-6 rounded-xl shadow-inner space-y-2">
          <h3 className="text-lg font-semibold">🏥 Клініка</h3>
          <p className="font-medium">{blog.clinic.name}</p>
          <p>
            {blog.clinic.address}, {blog.clinic.city}
          </p>
          {blog.clinic.phone && <p>📞 {blog.clinic.phone}</p>}
          {blog.clinic.website && (
            <p>
              🌐{" "}
              <a
                href={blog.clinic.website}
                className="text-blue-600 underline"
                target="_blank"
              >
                {blog.clinic.website}
              </a>
            </p>
          )}
          <p className="text-sm text-gray-600">{blog.clinic.description}</p>
        </div>

        {/* Коментарі */}
        <div className="bg-slate-50 p-6 rounded-xl shadow-inner">
          <h3 className="text-lg font-semibold mb-4">
            💬 Коментарі ({blog.comments.length})
          </h3>
          <div className="space-y-4">
            {blog.comments.length === 0 && (
              <p className="text-gray-500">Коментарів ще немає.</p>
            )}
            {blog.comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-3">
                <p className="text-sm text-gray-700 mb-1">{comment.content}</p>
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>
                    {comment.user?.surname} {comment.user?.name} (
                    {comment.user?.username})
                  </span>
                  <span>{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Кнопка */}
        <div>
          <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg">
            Назад до блогу
          </button>
        </div>
      </div>
    </div>
  );
}
