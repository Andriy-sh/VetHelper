"use client";
import { clinicNewSchema, ClinicNewSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ClinicNewsCategory } from "@/lib/interface";
import { addingClinicNews } from "@/lib/actions/addingClinicNews";

export default function AddingClinicNews({
  clinicId,
  category,
}: {
  clinicId: string;
  category: ClinicNewsCategory[];
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<ClinicNewSchema>({
    resolver: zodResolver(clinicNewSchema),
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
      categoryId: "",
    },
  });

  const handleAddNew = async (data: ClinicNewSchema) => {
    try {
      setOpen(false);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("imageUrl", data.imageUrl || "");
      formData.append("clinicId", clinicId);
      formData.append("categoryId", data.categoryId || "");
      console.log(Object.fromEntries(formData));
      await addingClinicNews(formData);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Додати новину</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Додати новину</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddNew)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Назва новини</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Назва" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Опис</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Введіть текст новини" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Категорія</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Оберіть категорію" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {category.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Зберегти</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
