'use server'
import { signIn } from "../../../auth";

export const googleSignIn = async () => {
  await signIn("google", { redirectTo: "/adding-pet" });
};
export const googleSignUp= async () => {
  await signIn("google", { redirectTo: "/adding-pet" });
};
