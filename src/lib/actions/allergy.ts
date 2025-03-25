"use server";

import { prisma } from "../../../prisma";

export const allergy = async (formData: FormData) => {
  const petId = formData.get("petId") as string;
  const name = formData.get("name") as string;
  const symptoms = formData.get("symptoms") as string;
  const recommendations = formData.get("recommendations") as string;
  const date = formData.get("date") as string;
  await prisma.allergy.create({
    data: {
      petId: petId,
      name: name,
      symptoms: symptoms,
      recommendations: recommendations,
      dateDetected: date,
    },
  });
};
