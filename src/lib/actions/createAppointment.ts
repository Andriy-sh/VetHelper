"use server";
import { prisma } from "../../../prisma";

export const createAppointment = async (formData: FormData) => {
  const userId = formData.get("userId");
  const notes = formData.get("notes");
  const clinicId = formData.get("clinicId");
  const dateValue = formData.get("date");
  if (!dateValue) {
    throw new Error("Date is required");
  }
  const date = new Date(dateValue as string).toISOString();

  await prisma.appointment.create({
    data: {
      userId: userId as string,
      clinicId: clinicId as string,
      notes: notes as string,
      date: date,
    },
  });
};
