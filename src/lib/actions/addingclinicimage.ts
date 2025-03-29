"use server";

import { prisma } from "../../../prisma";

export const addingclinicimage = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const url = formData.get("imageId") as string;
  const clinicId = formData.get("clinicId") as string;
  const userId = formData.get("userId") as string;
  await prisma.clinicImage.create({
    data: {
      title: title,
      content: content,
      url: url,
      userId: userId,
      clinicId: clinicId,
    },
  });
};
