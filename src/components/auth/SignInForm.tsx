"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, signinSchema } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { signInAction } from "@/lib/actions/signIn";
import { Input } from "../ui/input";
import Link from "next/link";

export const SignInForm = () => {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInSchema) => {
    const formdata = new FormData();
    formdata.append("email", values.email);
    formdata.append("password", values.password);
    await signInAction(formdata);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      {...field}
                      type="email"
                      placeholder="Email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      {...field}
                      type="password"
                      placeholder="Password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full text-lg py-3 rounded-xl">
              Sign In
            </Button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Don`t have an account?{" "}
            <Link
              href="/signUp"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};
