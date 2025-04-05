"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { citySchema, CitySchema } from "@/lib/schema";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { addingCity } from "@/lib/actions/addingcity";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function AddingCity({
  userId,
  children,
}: {
  userId: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const form = useForm<CitySchema>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      city: "",
    },
  });
  const handleSumbit = async (data: CitySchema) => {
    const formData = new FormData();
    formData.append("city", data.city);
    formData.append("userId", userId);
    await addingCity(formData);
    router.refresh();
    form.reset();
  };
  return (
    <div>
      {children}
      <Form {...form}>
        <form onClick={form.handleSubmit(handleSumbit)}>
          <FormField
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label>Введіть місто</Label>
                <FormControl>
                  <Input
                    {...field}
                    id="city"
                    type="text"
                    placeholder="Введіть місто"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="city"
          ></FormField>
          <Button type="submit">Ввести місто</Button>
        </form>
      </Form>
    </div>
  );
}
