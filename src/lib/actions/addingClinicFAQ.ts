"use server";

import { prisma } from "../../../prisma";

export const addingClinicFAQ = async (formData: FormData) => {
  const clinicId = formData.get("clinicId") as string;
  const question = formData.get("question") as string;
  const answer = formData.get("answer") as string;
  await prisma.clinicFAQ.create({
    data: {
      clinicId: clinicId,
      question: question,
      answer: answer,
    },
  });
};
