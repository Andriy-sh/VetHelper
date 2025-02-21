import { SignInForm } from "@/components/auth/SignInForm";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <SignInForm />
    </div>
  );
}
