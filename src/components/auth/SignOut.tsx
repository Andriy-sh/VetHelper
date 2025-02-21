'use client'
import { signOut } from "next-auth/react";

export const HandleSignOut = async () => {
  await signOut();
};
