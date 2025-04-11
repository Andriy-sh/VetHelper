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
import { CheckCircle, XCircle, Clock, CalendarCheck } from "lucide-react";

export default function Dashboard({
  appointments,
  user,
}: {
  appointments: Appointment[];
  user: User;
}) {
  const router = useRouter();

  if (!appointments || appointments.length === 0) {
    return (
      <div className="mt-[72px] text-center text-gray-500">
        Немає записів на сьогодні
      </div>
    );
  }

  const today = new Date();
  const todayDateString = today.toISOString().split("T")[0];

  const todayAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date)
      .toISOString()
      .split("T")[0];
    return appointmentDate === todayDateString;
  });

  if (todayAppointments.length === 0) {
    return (
      <div className="mt-[72px] text-center text-gray-500">
        Немає прийомів на сьогодні
      </div>
    );
  }

  const sortedAppointments = todayAppointments.sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  const handleStatusChange = async (
    appointmentId: string,
    newStatus: string
  ) => {
    const appointment = appointments.find((a) => a.id === appointmentId);
    if (!appointment) return;

    await updateAppointmentStatus(
      appointmentId,
      newStatus as AppointmentStatus
    );
    router.refresh();

    await sendUpdateStatus({
      senderId: user.id,
      clinicId: appointment.clinicId,
      userId: appointment.userId,
      status: newStatus,
    });
  };

  const getStatusStyles = (status: AppointmentStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 border-l-4 border-yellow-500";
      case "CONFIRMED":
        return "bg-blue-100 border-l-4 border-blue-500";
      case "CANCELED":
        return "bg-red-100 border-l-4 border-red-500";
      case "COMPLETED":
        return "bg-green-100 border-l-4 border-green-500";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: AppointmentStatus) => {
    switch (status) {
      case "PENDING":
        return <Clock className="text-yellow-500 w-5 h-5" />;
      case "CONFIRMED":
        return <CalendarCheck className="text-blue-500 w-5 h-5" />;
      case "CANCELED":
        return <XCircle className="text-red-500 w-5 h-5" />;
      case "COMPLETED":
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-200 mt-[72px] p-6">
      {user.role === "VETERINARIAN" && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2">
            Сьогоднішні прийоми
          </h2>

          <div className="mt-4 bg-white shadow-md rounded-lg ">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="px-6 py-3">Статус</TableHead>
                  <TableHead className="px-6 py-3">Дата</TableHead>
                  <TableHead className="px-6 py-3">Час</TableHead>
                  <TableHead className="px-6 py-3">Проблема</TableHead>
                  <TableHead className="px-6 py-3">Змінити статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAppointments.map((appointment) => (
                  <TableRow
                    key={appointment.id}
                    className={`hover:bg-gray-200 cursor-pointer transition-all duration-200 rounded-md ${getStatusStyles(
                      appointment.status
                    )}`}
                    onClick={() =>
                      router.push(
                        `/clinics/${appointment.clinicId}/appoiment/${appointment.id}`
                      )
                    }
                  >
                    <TableCell className="px-6 py-3">
                      {getStatusIcon(appointment.status)}
                    </TableCell>
                    <TableCell className="px-6 py-3">
                      {new Date(appointment.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-6 py-3">
                      {appointment.time}
                    </TableCell>
                    <TableCell className="px-6 py-3">
                      {appointment.notes || "Без приміток"}
                    </TableCell>
                    <TableCell className="px-6 py-3 w-32">
                      <Select
                        value={appointment.status}
                        onValueChange={(newStatus) =>
                          handleStatusChange(appointment.id, newStatus)
                        }
                      >
                        <SelectTrigger>
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
