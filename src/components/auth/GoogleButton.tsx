"use client";

import { googleSignIn, googleSignUp } from "@/lib/actions/google_signin";
import { FcGoogle } from "react-icons/fc";

interface GoogleButtonProps {
  info: string;
}

export const GoogleButton = ({ info }: GoogleButtonProps) => {
  return (
    <button
      onClick={googleSignIn}
      className="flex items-center justify-center w-full py-3 rounded-xl border border-gray-300 transition-all duration-300 ease-in-out transform hover:bg-gray-100 hover:scale-105"
    >
      <FcGoogle className="text-2xl mr-2" />
      <span className="font-medium">{info}</span>
    </button>
  );
};
export const GoogleButtonSingUp = ({ info }: GoogleButtonProps) => {
  return (
    <button
      onClick={googleSignUp}
      className="flex items-center justify-center w-full py-3 rounded-xl border border-gray-300 transition-all duration-300 ease-in-out transform hover:bg-gray-100 hover:scale-105"
    >
      <FcGoogle className="text-2xl mr-2" />
      <span className="font-medium">{info}</span>
    </button>
  );
};
