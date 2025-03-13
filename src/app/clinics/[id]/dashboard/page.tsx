import { notFound } from "next/navigation";
import { prisma } from "../../../../../prisma";
import { auth } from "../../../../../auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  });
  return (
    <div className="mt-[72px]">
      {user.role === "Veterinarian" && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2">
            Прийоми
          </h2>

          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Час</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Проблема</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map(
                  (appointment) =>
                    appointment.status !== "COMPLETED" &&
                    appointment.status !== "CANCELED" && (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          {new Date(appointment.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.status}</TableCell>
                        <TableCell>{appointment.notes}</TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
