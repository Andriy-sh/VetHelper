"use server";

import { prisma } from "../../../prisma";

export const clinicreviews = async (formData: FormData) => {
  const clinicId = formData.get("clinicId") as string;
  const userId = formData.get("userId") as string;
  const comment = formData.get("comment") as string;
  const rating = formData.get("rating") as string;
  await prisma.clinicReview.create({
    data: {
      clinicId: clinicId,
      userId: userId,
      comment: comment,
      rating: rating,
    },
  });
};
