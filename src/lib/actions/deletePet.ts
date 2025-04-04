"use server";

import { prisma } from "../../../prisma";

export const deletePet = async (petId: string) => {
  await prisma.pet.delete({
    where: {
      id: petId,
    },
  });
};
