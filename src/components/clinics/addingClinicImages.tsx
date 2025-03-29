"use client";
import { CloudinaryResponse, User } from "@/lib/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import axios from "axios";
import { addingclinicimage } from "@/lib/actions/addingclinicimage";
import { addingClinicImage, AddingClinicImage } from "@/lib/schema";

export default function AddPostButton({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const form = useForm<AddingClinicImage>({
    resolver: zodResolver(addingClinicImage),
    defaultValues: {
      title: "",
      content: "",
      imageId: undefined,
    },
  });

  const handleAddPost = async (data: AddingClinicImage) => {
    const file = data.imageId as File | undefined;

    if (!file) {
      console.error("Файл не вибрано");
      return;
    }

    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", "clinicImages");

    try {
      setOpen(false);

      const response = await axios.post<CloudinaryResponse>(
        "https://api.cloudinary.com/v1_1/dddgmovz2/image/upload",
        imageData
      );

      const public_id = response.data.public_id;

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("userId", user.id);
      formData.append("imageId", public_id);
      if (user.clinicId) {
        formData.append("clinicId", user.clinicId);
      }

      await addingclinicimage(formData);
      form.reset();
    } catch (error) {
      console.error("Помилка при завантаженні поста:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Додати фото клініки</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Додати фото клініки</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddPost)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>Введіть назву фото</Label>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Назва для фото"
                      {...field}
                    />
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
                  <Label>Введіть опис фото</Label>
                  <FormControl>
                    <Input type="text" placeholder="Опис фото" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="imageId"
              control={form.control}
              render={({ field: { onChange } }) => (
                <FormItem>
                  <Label>Зображення</Label>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Додати пост</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
