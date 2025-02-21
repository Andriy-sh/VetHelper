"use client"; // Додаємо, бо обробник подій виконується на клієнті

import { signUp } from "@/lib/actions/singUp";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Button } from "../ui/button";
import { Form, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/schema";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";

export const SignUpForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await signUp(formData);
    if (res?.success) {
      router.push("/signIn");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormItem>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              required
              className="w-full"
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="surname">Surname</Label>
            <Input
              id="surname"
              name="surname"
              type="text"
              placeholder="Surname"
              required
              className="w-full"
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full"
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full"
            />
          </FormItem>

          <Button type="submit" className="w-full mt-4">
            Sign Up
          </Button>
        </form>
        <Link href="/signIn">Go to SignIn</Link>
      </Form>
    </div>
  );
};
