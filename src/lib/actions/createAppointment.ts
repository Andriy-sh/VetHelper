"use server";
import { prisma } from "../../../prisma";

export const createAppointment = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const clinicId = formData.get("clinicId") as string;
  const petId = formData.get("petId") as string;
  const notes = formData.get("notes") as string;
  const dateValue = formData.get("date") as string;
  const time = formData.get("time") as string;

  if (!dateValue || !time) {
    throw new Error("Date and time are required");
  }

  const date = new Date(dateValue).toISOString();

  const existingAppointment = await prisma.appointment.findFirst({
    where: { clinicId, date, time },
  });

  if (existingAppointment) {
    throw new Error("Цей час уже зайнятий. Оберіть інший.");
  }

  return await prisma.appointment.create({
    data: {
      userId,
      clinicId,
      petId,
      notes,
      date,
      time,
    },
  });
};
