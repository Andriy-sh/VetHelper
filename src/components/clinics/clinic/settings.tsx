"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clinicSchema, ClinicSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { Clinic } from "@/lib/interface";
import { editClinic } from "@/lib/actions/editClinic";
import { Textarea } from "@/components/ui/textarea";
import { Settings } from "lucide-react";
import { InputMask } from "@react-input/mask";

export default function EditClinicDialog({
  clinic,
  setClinicData,
}: {
  clinic: Clinic;
  setClinicData: (clinic: Clinic) => void;
}) {
  const [name, setName] = useState(clinic.name);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ClinicSchema>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: clinic.name,
      city: clinic.city,
      address: clinic.address?.replace(/^вул\.\s*/i, "") || "",
      phone: clinic.phone || "",
      website: clinic.website || "",
      description: clinic.description || "",
    },
  });

  useEffect(() => {
    if (clinic) {
      form.reset({
        name: clinic.name,
        city: clinic.city,
        address: clinic.address?.replace(/^вул\.\s*/i, "") || "",
        phone: clinic.phone || "",
        website: clinic.website || "",
        description: clinic.description || "",
      });
    }
  }, [clinic, form]);

  const handleClinicSubmit = async (data: ClinicSchema) => {
    setLoading(true); 
    const formattedAddress = data.address.startsWith("вул.")
      ? data.address
      : `вул. ${data.address}`;

    const updateData = {
      ...clinic,
      ...data,
      address: formattedAddress,
    };

    const formData = new FormData();
    formData.append("id", clinic.id);
    formData.append("name", data.name);
    formData.append("address", formattedAddress);
    formData.append("phone", data.phone || "");
    formData.append("website", data.website || "");
    formData.append("city", data.city);
    formData.append("description", data.description || "");

    try {
      await editClinic(formData);
      setOpen(false);
      setName(data.name);
      setClinicData(updateData);
      router.refresh();
    } catch (error) {
      console.error("Error updating clinic:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-black">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Редагування клініки: {name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleClinicSubmit)}
            className="space-y-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Назва клініки</Label>
                  <FormControl>
                    <Input type="text" placeholder="Введіть назву" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Місто</Label>
                  <FormControl>
                    <Input type="text" placeholder="Введіть місто" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Адреса</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">вул.</span>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Введіть назву вулиці та номер будинку"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Телефон</Label>
                  <FormControl>
                    <InputMask
                      mask="+38 (___) ___ __ __"
                      replacement={{ _: /\d/ }}
                      {...field}
                      component={Input}
                      placeholder="+38 (___) ___ __ __"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="website"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Вебсайт</Label>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://clinic.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Опис</Label>
                  <FormControl>
                    <Textarea
                      placeholder="Опишіть клініку"
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
              disabled={loading} 
            >
              {loading ? "Оновлення..." : "Оновити дані клініки"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
