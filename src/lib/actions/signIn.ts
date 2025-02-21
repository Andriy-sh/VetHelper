"use server";

import { signIn } from "../../../auth";
import { executeAction } from "@/lib/actions/executeaction";

export const signInAction = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      await signIn("credentials", formData);
    },
  });
};
