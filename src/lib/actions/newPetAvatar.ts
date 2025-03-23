"use server";

import { prisma } from "../../../prisma";

export const newPetAvatar = async ({
  petId,
  imageId,
}: {
  petId: string;
  imageId: string;
}) => {
  await prisma.pet.update({
    where: { id: petId },
    data: { image: imageId },
  });
};
