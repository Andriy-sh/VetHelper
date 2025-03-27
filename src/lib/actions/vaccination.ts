"use server";

import { prisma } from "../../../prisma";

export const vaccination = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const notes = formData.get("notes") as string;
  const date = formData.get("date") as string;
  const nextDoseDue = formData.get("nextDoseDue") as string;
  const petId = formData.get("petId") as string;
  const clinicId = formData.get("clinicId") as string;
  await prisma.vaccination.create({
    data: {
      name: name,
      notes: notes,
      date: new Date(date),
      nextDoseDue: nextDoseDue ? new Date(nextDoseDue) : null,
      petId: petId,
      clinicId: clinicId,
    },
  });
};
