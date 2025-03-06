import { SignInForm } from "@/components/auth/SignInForm";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect("/adding-pet");
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <SignInForm />
    </div>
  );
}
