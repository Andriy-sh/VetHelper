import { notFound } from "next/navigation";
import { auth } from "../../../../../auth";
import { prisma } from "../../../../../prisma";

export default async function Page({
  params,
}: {
  params: { clinicId: string; appointmentId: string };
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
  });
  return <div>{appointment?.id}</div>;
}
