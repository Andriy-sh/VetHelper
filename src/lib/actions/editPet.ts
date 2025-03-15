"use server";

import { Gender, Species } from "@prisma/client";
import { prisma } from "../../../prisma";

export const editPet = async (formdata: FormData) => {
  const id = formdata.get("id") as string;
  const name = formdata.get("name") as string;
  const species = formdata.get("species") as Species;
  const breed = formdata.get("breed") as string;
  const age = formdata.get("age") as string;
  const gender = formdata.get("gender") as Gender;
  await prisma.pet.update({
    where: { id: id },
    data: {
      name: name,
      species: species,
      breed: breed,
      gender: gender,
      age: Number(age),
    },
  });
};
