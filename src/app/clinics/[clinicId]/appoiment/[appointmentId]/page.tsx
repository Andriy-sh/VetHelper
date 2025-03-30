import { notFound } from "next/navigation";
import { auth } from "../../../../../../auth";
import { prisma } from "../../../../../../prisma";
import AppointmentInfo from "@/components/appointment/appointmentInfo";

export default async function Page({
  params,
}: {
  params: { clinicId: string; zzz: string };
}) {
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

  const appointment = await prisma.appointment.findUnique({
    where: { id: params.appointmentId },
    include: { clinic: true },
  });
  if (!appointment) {
    notFound();
  }
  const pet = await prisma.pet.findUnique({
    where: {
      id: appointment?.petId,
    },
  });
  if (!pet) {
    notFound();
  }
  const diseases = await prisma.disease.findMany({
    where: { petId: pet.id },
  });
  return (
    <div>
      <AppointmentInfo
        appointment={appointment}
        pet={pet}
        user={user}
        diseases={diseases}
        clinic={appointment.clinic}
      />
    </div>
  );
}
