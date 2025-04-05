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
  const clinics = await prisma.clinic.findMany();
  if (!user.city) {
    return <AddingCity userId={user.id} />;
  }
  return (
    <div>
      <Clinics clinics={clinics} user={user} />
    </div>
  );
}
