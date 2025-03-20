"use server";

import { prisma } from "../../../prisma";

export const sendUpdateStatus = async ({
  userId,
  clinicId,
  senderId,
  status,
}: {
  userId: string;
  clinicId: string;
  senderId: string;
  status: string;
}) => {
  let message = "";

  switch (status) {
    case "PENDING":
      message = "Ваш прийом очікує підтвердження.";
      break;
    case "CONFIRMED":
      message = "Ваш прийом підтверджено! Будь ласка, приходьте вчасно.";
      break;
    case "COMPLETED":
      message = "Ваш прийом успішно завершено. Дякуємо за довіру!";
      break;
    case "CANCELED":
      message =
        "Ваш прийом було скасовано. Якщо це помилка, зверніться в клініку.";
      break;
    default:
      message = "Статус вашого прийому оновлено.";
  }

  return await prisma.notification.create({
    data: {
      userId,
      senderId,
      clinicId,
      message,
    },
  });
};

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
