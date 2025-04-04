"use server";

import { prisma } from "../../../prisma";

export const deleteUser = async (userId: string) => {
  await prisma.user.delete({
    where: { id: userId },
  });
};
