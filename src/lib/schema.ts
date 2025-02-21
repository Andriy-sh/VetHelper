import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name must be at least 3 characters",
    })
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
export type SignUpSchema = z.infer<typeof signupSchema>;
