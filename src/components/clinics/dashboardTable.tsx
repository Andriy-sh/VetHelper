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

export default function Dashboard({
  appointments,
  user,
}: {
  appointments: Appointment[];
  user: User;
}) {
  const router = useRouter();

  // Отримуємо поточну дату
  const today = new Date();
  const todayDateString = today.toISOString().split("T")[0]; // Форматуємо дату у "YYYY-MM-DD"

  // Фільтруємо записи, залишаючи лише сьогоднішні
  const todayAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date)
      .toISOString()
      .split("T")[0];
    return appointmentDate === todayDateString;
  });

  // Сортуємо сьогоднішні записи за часом від меншого до більшого
  const sortedAppointments = todayAppointments.sort((a, b) => {
    const timeA = a.time; // Припустимо, що час у форматі "HH:MM"
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
    router.refresh();
  };

  return (
    <div className="mt-[72px]">
      {user.role === "Veterinarian" && (
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
                          <SelectItem value="COMPLETED">Завершено</SelectItem>
                          <SelectItem value="CANCELED">Скасовано</SelectItem>
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
