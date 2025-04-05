import { prisma } from "../../../../prisma";
import { auth } from "../../../../auth";
import BlogInfo from "@/components/blogs/blog/blogInfo";
import { ParsedUrlQuery } from "querystring";

interface PageProps {
  params: ParsedUrlQuery & { blogId: string };
}

export default async function Page({ params }: PageProps) {
  const session = await auth();
  if (!session) {
    throw new Error("aijsbdiasd");
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email ?? undefined },
  });
  if (!user) {
    throw new Error("aijsbdiasd");
  }
  const blog = await prisma.blogPost.findUnique({
    where: { id: params.blogId },
    include: { clinic: true },
  });

  if (!blog) {
    return <div className="text-center text-red-500">Блог не знайдено</div>;
  }

  return <BlogInfo blog={blog} user={user} />;
}
