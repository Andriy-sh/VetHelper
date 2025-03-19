"use server";

import { prisma } from "../../../prisma";
export const readNotification = async ({ id }: { id: string }) => {
  if (!id) {
    throw new Error("Notification ID is missing");
  }

  await prisma.notification.update({
    where: { id: String(id) },
    data: {
      read: true,
    },
  });
};

export const readAllNotification = async ({ userId }: { userId: string }) => {
  if (!userId) {
    throw new Error("Notification userId is missing");
  }

  await prisma.notification.updateMany({
    where: { userId: userId, read: false },
    data: {
      read: true,
    },
  });
};
