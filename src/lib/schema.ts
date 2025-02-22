import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character" })
    .max(30, {
      message: "Name must be at most 30 characters",
    }),
  surname: z
    .string()
    .min(1, {
      message: "Surname must be at least 1 character",
    })
    .max(30, {
      message: "Surname must be at most 30 characters",
    }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(3, {
      message: "Password must be at least 3 characters",
    })
    .max(15, {
      message: "Password must be at most 15 characters",
    }),
});
export type SignUpSchema = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters" })
    .max(15, { message: "Password must be at most 15 characters" }),
});

export type SignInSchema = z.infer<typeof signinSchema>;
export const petSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(30, {
      message: "Name must be at most 30 characters",
    }),
  species: z.string().min(1, { message: "Species is require" }),
  gender: z.string().min(1, { message: "Gender is require" }),
  breed: z.string().min(1, { message: "Breed is require" }),
  age: z.coerce
    .number()
    .min(1, { message: "Enter age" })
    .max(100, { message: "Max age is 100" }),
});
export type PetSchema = z.infer<typeof petSchema>;
