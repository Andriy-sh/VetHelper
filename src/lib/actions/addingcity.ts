"use server";

import { prisma } from "../../../prisma";

export async function addingCity(formData: FormData) {
  const city = formData.get("city") as string;
  const userId = formData.get("userId") as string;
  await prisma.user.update({
    where: { id: userId },
    data: { city: city },
  });
}
