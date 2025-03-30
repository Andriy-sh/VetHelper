"use server";
import { prisma } from "../../../prisma";

export const addingClinicService = async (formData: FormData) => {
  const clinicId = formData.get("clinicId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const priceNumber = Number(price);
  const category = formData.get("category") as string;
  const duration = formData.get("duration") as string;
  const durationNumber = Number(duration);
  await prisma.clinicService.create({
    data: {
      clinicId: clinicId,
      name: name,
      description: description,
      price: priceNumber,
      duration: durationNumber,
      category: category,
    },
  });
};
