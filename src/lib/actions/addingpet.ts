"use server";
import { Gender, Species } from "@prisma/client";
import { auth } from "../../../auth";
import { prisma } from "../../../prisma";
import { petSchema } from "../schema";

export const addingPet = async (
  formdata: FormData
): Promise<{ success: boolean }> => {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User not found");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const name = formdata.get("name");
  const species = formdata.get("species");
  const breed = formdata.get("breed");
  const age = formdata.get("age");
  const gender = formdata.get("gender");

  const validate = petSchema.safeParse({
    name: name as string,
    species: species as string,
    breed: breed as string,
    age: Number(age),
    gender: gender as string,
  });

  if (!validate.success) {
    return { success: false };
  }

  await prisma.pet.create({
    data: {
      name: validate.data.name,
      species: validate.data.species as Species,
      breed: validate.data.breed,
      age: validate.data.age,
      gender: validate.data.gender as Gender,
      userId: user.id,
    },
  });

  return { success: true };
};
