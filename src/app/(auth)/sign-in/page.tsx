import { SignInForm } from "@/components/auth/SignInForm";

export default async function Page() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <SignInForm />
    </div>
  );
}
