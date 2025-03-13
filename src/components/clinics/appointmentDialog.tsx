"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppointmentSchema, appointmentSchema } from "@/lib/schema";
import { createAppointment } from "@/lib/actions/createAppointment";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { format } from "date-fns";

export function AppointmentDialog({
  name,
  userId,
  clinicId,
  times,
  date,
}: {
  name: string;
  userId: string;
  clinicId: string;
  times: string[]; 
  date: string[];
}) {
  const form = useForm<AppointmentSchema>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      petId: "",
      notes: "",
      date: "",
      time: "",
    },
  });

  const availableTimes = [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const bookedTimesMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    date.forEach((d, index) => {
      const formattedDate = format(new Date(d), "yyyy-MM-dd");
      if (!map[formattedDate]) {
        map[formattedDate] = [];
      }
      map[formattedDate].push(times[index]);
    });
    return map;
  }, [date, times]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (data: AppointmentSchema) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("clinicId", clinicId);
      formData.append("notes", data.notes);
      formData.append("date", data.date);
      formData.append("time", data.time);

      await createAppointment(formData);
      router.refresh();
      form.reset();
      setOpen(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Не вдалося записатися."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedDate = form.watch("date");
  const disabledTimes = bookedTimesMap[selectedDate] || [];

  // Обчислюємо дату через два тижні
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
  const minDate = new Date().toISOString().split("T")[0]; // Мінімальна дата - сьогодні
  const maxDate = twoWeeksLater.toISOString().split("T")[0]; // Максимальна дата - через два тижні

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Записатися на прийом</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Запис на прийом в {name}</DialogTitle>
          <DialogDescription>
            Виберіть дату та час для запису.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <Label>Опишіть проблему</Label>
                  <FormControl>
                    <Input
                      {...field}
                      id="notes"
                      type="text"
                      placeholder="Напишіть проблему"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <Label>What date</Label>
                  <FormControl>
                    <Input
                      {...field}
                      id="date"
                      type="date"
                      placeholder="Choose date"
                      min={minDate} 
                      max={maxDate} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <Label>Час</Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Оберіть час" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableTimes.map((item) => (
                        <SelectItem
                          key={item}
                          value={item}
                          disabled={disabledTimes.includes(item)}
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full text-lg py-3 rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Запис триває..." : "Записатися"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
