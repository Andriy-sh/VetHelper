"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Appointment, User } from "@/lib/interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateAppointmentStatus } from "@/lib/actions/updateAppointmentStatus";
import { AppointmentStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { sendUpdateStatus } from "@/lib/actions/notification";

export default function Dashboard({
  appointments,
  user,
}: {
  appointments: Appointment[];
  user: User;
}) {
  const router = useRouter();

  const today = new Date();
  const todayDateString = today.toISOString().split("T")[0];

  const todayAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date)
      .toISOString()
      .split("T")[0];
    return appointmentDate === todayDateString;
  });

  const sortedAppointments = todayAppointments.sort((a, b) => {
    const timeA = a.time;
    const timeB = b.time;
    return timeA.localeCompare(timeB);
  });

  const handleStatusChange = async (
    appointmentId: string,
    newStatus: string
  ) => {
    console.log(`Updating appointment ${appointmentId} to status ${newStatus}`);
    await updateAppointmentStatus(
      appointmentId,
      newStatus as AppointmentStatus
    );
    const appointment = appointments.find((a) => a.id === appointmentId);
    console.log(appointment);
    router.refresh();

    await sendUpdateStatus({
      senderId: user.id,
      clinicId: appointment?.clinicId || "defaultClinicId",
      userId: appointment?.userId || "",
      status: newStatus,
    });
  };

  return (
    <div className="mt-[72px]">
      {user.role === "VETERINARIAN" && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2">
            Сьогоднішні прийоми
          </h2>

          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Час</TableHead>
                  <TableHead>Проблема</TableHead>
                  <TableHead>Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      {new Date(appointment.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.notes}</TableCell>
                    <TableCell className="w-32">
                      <Select
                        value={appointment.status}
                        onValueChange={(newStatus) =>
                          handleStatusChange(appointment.id, newStatus)
                        }
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Оберіть статус" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Очікується</SelectItem>
                          <SelectItem value="CONFIRMED">В процесі</SelectItem>
                          <SelectItem value="CANCELED">Скасовано</SelectItem>
                          <SelectItem value="COMPLETED">Завершено</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
