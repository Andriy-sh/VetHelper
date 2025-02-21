"use server";
import { prisma } from "../../../prisma";
import { signupSchema } from "../schema";
import bcrypt from "bcryptjs";

export const signUp = async (
  formData: FormData
): Promise<{ success: boolean }> => {
  const name = formData.get("name");
  const surname = formData.get("surname");
  const email = formData.get("email");
  const password = formData.get("password");
  const validate = signupSchema.safeParse({
    name: name as string,
    surname: surname as string,
    email: email as string,
    password: password as string,
  });
  if (!validate.success) {
    return { success: false };
  }
  // const hashedPassword = await bcrypt.hash(validate.data?.password, 10);
  await prisma.user.create({
    data: {
      name: validate.data?.name as string,
      surname: validate.data?.surname as string,
      email: validate.data?.email.toLocaleLowerCase() as string,
      password: validate.data?.password as string,
    },
  });
  return { success: true };
};
