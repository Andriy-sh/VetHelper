import Clinics from "@/components/clinics/clinics";
import { auth } from "../../../auth";
import { prisma } from "../../../prisma";
import AddingCity from "@/components/profile/addingCity";

export default async function Page() {
  const session = await auth();
  if (!session) {
    throw new Error("Blablabla");
  }
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? undefined },
  });
  if (!user) {
    throw new Error("User not logged");
  }
  const clinics = await prisma.clinic.findMany({
    where: { city: user?.city ?? undefined },
  });
  if (!user.city) {
    return <AddingCity user={user} session={session} />;
  }
  return (
    <div>
      <div className="flex justify-between mx-8">
        <h1>All in your City</h1>
        {user.role === "ADMIN" && <div>Ви Адмін</div>}
      </div>
      <Clinics clinics={clinics} user={user} />
    </div>
  );
}
