"use server";

import { prisma } from "../../../prisma";

export const addingClinicNews = async (formData: FormData) => {
  const clinicId = formData.get("clinicId") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const categoryId = formData.get("categoryId") as string;
  await prisma.clinicNews.create({
    data: {
      title: title,
      content: content,
      clinicId: clinicId,
      imageUrl: imageUrl,
      categoryId: categoryId,
    },
  });
};
