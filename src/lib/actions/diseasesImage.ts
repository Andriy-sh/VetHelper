"use server";

import { prisma } from "../../../prisma";

export const addDiseasesImage = async ({
  petId,
  name,
  description,
  imageId,
}: {
  petId: string;
  name: string;
  description: string;
  imageId: string;
}) => {
  await prisma.disease.create({
    data: {
      name: name,
      description: description,
      image: imageId,
      pet: {
        connect: {
          id: petId,
        },
      },
    },
  });
};
