"use client";
import { addingBlog } from "@/lib/actions/blogs/addingblog";
import { User } from "@/lib/interface";
import { AddingBlogSchema, addingBlogSchema } from "@/lib/schema";
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

export default function AddPostButton({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const form = useForm<AddingBlogSchema>({
    resolver: zodResolver(addingBlogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const handleAddPost = async (data: AddingBlogSchema) => {
    try {
      setOpen(false);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("userId", user.id);
      if (user.clinicId) {
        formData.append("clinicId", user.clinicId);
      }
      addingBlog(formData);
      form.reset();
    } catch {
      throw new Error("asdaondsi");
    } finally {
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Додати пост</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Дан про пост</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddPost)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>Впешіть назву статті</Label>
                  <FormControl>
                    <Input type="text" placeholder="назва статті" {...field} />
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
                  <Label>Впешіть опис</Label>
                  <FormControl>
                    <Input type="text" placeholder="опис" {...field} />
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
