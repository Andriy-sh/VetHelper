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
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export function AppointmentDialog({
  name,
  userId,
  clinicId,
}: {
  name: string;
  userId: string;
  clinicId: string;
}) {
  const form = useForm<AppointmentSchema>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      petId: "",
      notes: "",
      date: "",
    },
  });
  const router = useRouter();
  const handleSumbit = async (data: AppointmentSchema) => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("clinicId", clinicId);
    formData.append("notes", data.notes);
    formData.append("date", data.date);

    await createAppointment(formData);
    router.push("/");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Записатися на прийом</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Запис на прийом в {name}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSumbit)}>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <Label>What problem?</Label>
                  <FormControl>
                    <Input
                      {...field}
                      id="notes"
                      type="text"
                      placeholder="Enter your problem"
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
                      placeholder="Choise date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full text-lg py-3 rounded-xl">
              Appointment
            </Button>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
