"use client";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { vaccinationSchema, VaccinationSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { vaccination } from "@/lib/actions/vaccination";
import { Button } from "../ui/button";
import { useState } from "react";

export default function VaccinationDialog({
  petId,
  clinicId,
}: {
  petId: string;
  clinicId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<VaccinationSchema>({
    resolver: zodResolver(vaccinationSchema),
    defaultValues: {
      name: "",
      date: "",
      nextDoseDue: "",
      notes: "",
    },
  });
  const handleVaccination = async (data: VaccinationSchema) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("date", data.date);
      formData.append("notes", data.notes);
      formData.append("nextDoseDue", data.nextDoseDue);
      formData.append("petId", petId);
      if (clinicId) {
        formData.append("clinicId", clinicId);
      }
      await vaccination(formData);
      setOpen(false);
      setIsSubmitting(true);
      form.reset();
    } catch {
      new Error("фщытвщфтывщ");
    } finally {
      if (isSubmitting) return;
      setIsSubmitting(true);
    }
  };
  const min = new Date().toISOString().split("T")[0];
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all">
            <span className="text-lg">+</span> Додати вакцинацію
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Додати вакцинацію</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleVaccination)}>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Назва вакцини</Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Введіть назву вакцини"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="notes"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Примітка</Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Введіть примітку(опис) або догяд"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="date"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Оберіть дату введення вакцини</Label>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Дата введення вакцини"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="nextDoseDue"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Наступне введення вакцини (Якщо потрібно)</Label>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Дата для наступного введення"
                        {...field}
                        min={min}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Триває запис" : "Додати вакцину"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
