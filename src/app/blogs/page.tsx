import AddPostButton from "@/components/blogs/addPostButton";
import BlogPostCard from "@/components/blogs/blogPostCard";
import { auth } from "../../../auth";
import { prisma } from "../../../prisma";

export default async function Page() {
  const session = await auth();
  if (!session) {
    throw new Error("adsasd");
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email ?? undefined },
  });
  if (!user) {
    throw new Error("adsasd");
  }
  const blogs = await prisma.blogPost.findMany({ include: { clinic: true } });
  return (
    <div className="min-h-screen  bg-gradient-to-b from-white to-slate-200">
      {user.role === "VETERINARIAN" && <AddPostButton user={user} />}
      <BlogPostCard blogs={blogs} />
    </div>
  );
}
