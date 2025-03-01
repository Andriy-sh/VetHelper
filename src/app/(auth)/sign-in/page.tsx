import { SignInForm } from "@/components/auth/SignInForm";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/service/user";

export default async function Page() {
  const session = await getSession();
  if (session) {
    redirect("/adding-pet");
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <SignInForm />
    </div>
  );
}
