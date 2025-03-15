"use server";

import { AppointmentStatus } from "@prisma/client";
import { prisma } from "../../../prisma";

export const updateAppointmentStatus = async (
  appointmentId: string,
  status: AppointmentStatus
) => {
  await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: status },
  });
};
