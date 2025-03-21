"use server";

import { prisma } from "../../../prisma";

export const updateAvatar = async (userId: string, image: string) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      image: image,
    },
  });
};
