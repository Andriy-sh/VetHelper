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
import { GoogleButton } from "./GoogleButton";
import { useRouter } from "next/navigation";

export const SignInForm = () => {
  const router = useRouter()
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
    const res = await signInAction(formdata);
    if (res?.success) {
      router.push("/addint-pet");
    }
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        <GoogleButton info="Sign In with Google" />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or</span>
          </div>
        </div>

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
              href="/sign-up"
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
