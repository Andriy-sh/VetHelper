"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { clinicFAQSchema, ClinicFAQSchema } from "@/lib/schema";
import { addingClinicFAQ } from "@/lib/actions/addingClinicFAQ";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";

export default function AddingClinicFAQ({ clinicId }: { clinicId: string }) {
  const [open, setOpen] = useState(false);
  const form = useForm<ClinicFAQSchema>({
    resolver: zodResolver(clinicFAQSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });
  const handleAddFAQ = async (data: ClinicFAQSchema) => {
    try {
      setOpen(false);
      const formData = new FormData();
      formData.append("clinicId", clinicId);
      formData.append("question", data.question);
      formData.append("answer", data.answer);
      await addingClinicFAQ(formData);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Додати питання</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Додати питання</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddFAQ)}>
            <FormField
              name="question"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Введіть питання</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Питання?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="answer"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Введіть відповідь</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Відповідь" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Додати питання
            </button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
