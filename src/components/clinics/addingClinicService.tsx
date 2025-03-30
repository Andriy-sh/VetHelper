"use client";
import { useState } from "react";
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
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { clinicServiceSchema, ClinicServiceSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addingClinicService } from "@/lib/actions/addingClinicService";

export default function AddingClinicService({
  clinicId,
}: {
  clinicId: string;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<ClinicServiceSchema>({
    resolver: zodResolver(clinicServiceSchema),
    defaultValues: {
      name: "",
      description: "",
      duration: 0,
      price: 0,
      category: "",
    },
  });

  const handleAddService = async (data: ClinicServiceSchema) => {
    try {
      setOpen(false);
      const formData = new FormData();
      formData.append("clinicId", clinicId);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("category", data.category);
      formData.append("duration", String(data.duration));

      await addingClinicService(formData);
      form.reset();
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Додати послугу</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Додати Послугу</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddService)}
            className="grid grid-cols-3 gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Назва послуги</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Введіть назву послуги"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Опис послуги</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Опис послуги" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ціна</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ціна" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тривалість (хв.)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Тривалість (хв.)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Категорія</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Категорія" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="col-span-3">
              Додати послугу
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
