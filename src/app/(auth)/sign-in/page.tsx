import { SignInForm } from "@/components/auth/SignInForm";

export default async function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-slate-200">
      <SignInForm />
    </div>
  );
}
