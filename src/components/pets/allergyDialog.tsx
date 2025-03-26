"use client";
import { allergySchema, AllergySchema } from "@/lib/schema";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { allergy } from "@/lib/actions/allergy";

export default function AllergyDialog({
  petId,
  clinicId,
}: {
  petId: string;
  clinicId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<AllergySchema>({
    resolver: zodResolver(allergySchema),
    defaultValues: {
      name: "",
      symptoms: "",
      recommendations: "",
      date: "",
    },
  });
  const handleSubmit = async (data: AllergySchema) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("symptoms", data.symptoms);
      formData.append("recommendations", data.recommendations);
      formData.append("date", new Date(data.date).toISOString());
      formData.append("clinicId", clinicId);

      formData.append("petId", petId);
      await allergy(formData);
      setOpen(false);
    } catch {
      new Error("asdasd");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all">
          <span className="text-lg">+</span> Додати алергію
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Додати дані про Алергію</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Назва алергії</Label>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Введіть назву алергії"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="symptoms"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Введіть симптоми</Label>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Введіть симптоми"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="recommendations"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Введіть рекомендації стосовно вікування</Label>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Введіть рекомендації"
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
                  <Label>Введіть дату виявлення алергії</Label>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Дата виявлення алергії"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Триває запис" : "Додати дані про алергію"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
