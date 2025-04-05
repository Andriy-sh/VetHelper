import { notFound } from "next/navigation";
import { prisma } from "../../../../../prisma";
import { auth } from "../../../../../auth";
import Dashboard from "@/components/clinics/dashboardTable";

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
  const clinic = await prisma.clinic.findUnique({
    where: { id: user.clinicId ?? undefined },
  });
  if (!clinic) {
    notFound();
  }
  const appointments = await prisma.appointment.findMany({
    where: { clinicId: clinic.id },
    include: { clinic: true },
  });
  return <Dashboard appointments={appointments} user={user} />;
}
