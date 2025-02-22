'use server'
import { signIn } from "../../../auth";

export const googleSignIn = async () => {
  await signIn("google", { redirectTo: "/adding-pet" });
};
