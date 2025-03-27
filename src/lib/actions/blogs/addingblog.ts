"use server";

import { prisma } from "../../../../prisma";

export const addingBlog = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const userId = formData.get("userId") as string;
  const clinicId = formData.get("clinicId") as string;
  const imageId = formData.get("imageId") as string;
  await prisma.blogPost.create({
    data: {
      title: title,
      content: content,
      userId: userId,
      clinicId: clinicId,
      imageId: imageId,
    },
  });
};
