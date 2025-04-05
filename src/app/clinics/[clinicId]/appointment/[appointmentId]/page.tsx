import { notFound } from "next/navigation";
import { auth } from "../../../../../../auth";
import { prisma } from "../../../../../../prisma";
import AppointmentInfo from "@/components/appointment/appointmentInfo";

type Params = { clinicId: string; appointmentId: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;

  const session = await auth();
  if (!session) {
    throw new Error("Користувач не авторизований");
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? undefined },
  });
  if (!user) {
    throw new Error("Користувач не знайдений");
  }

  const appointment = await prisma.appointment.findUnique({
    where: { id: resolvedParams.appointmentId },
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
