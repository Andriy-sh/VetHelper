'use server'
import { signIn } from "../../../auth";

export const googleSignIn = async () => {
  await signIn("google", { redirectTo: "/profile" });
};
export const googleSignUp= async () => {
  await signIn("google", { redirectTo: "/adding-pet" });
};
