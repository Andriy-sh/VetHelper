"use client";

import { useState, useEffect } from "react";
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
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema, PetSchema } from "@/lib/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { editPet } from "@/lib/actions/editPet";
import { useRouter } from "next/navigation";
import { Pet } from "@/lib/interface";
import { Gender, Species } from "@prisma/client";

export default function EditDialog({
  pet,
  setPetData,
}: {
  pet: Pet;
  setPetData: (pet: Pet) => void;
}) {
  const [name, setName] = useState(pet.name);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const form = useForm<PetSchema>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      age: pet.age || undefined,
      breed: pet.breed || "",
      gender: pet.gender || "",
      name: pet.name || "",
      species: pet.species || "",
    },
  });

  useEffect(() => {
    if (pet) {
      form.reset({
        age: pet.age || undefined,
        breed: pet.breed || "",
        gender: pet.gender || "",
        name: pet.name || "",
        species: pet.species || "",
      });
    }
  }, [pet, form]);
  const handlePetSubmit = async (data: PetSchema) => {
    const updateData = {
      ...pet,
      ...data,
      species: data.species as Species,
      gender: data.gender as Gender,
    };
    const formData = new FormData();
    formData.append("id", pet.id);
    formData.append("age", String(data.age));
    formData.append("breed", data.breed);
    formData.append("name", data.name);
    formData.append("species", data.species);
    formData.append("gender", data.gender);
    await editPet(formData);
    setOpen(false);
    setName(data.name);
    setPetData(updateData);
    router.refresh();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Змінити дані про {name}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Змінити дані про {name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handlePetSubmit)}
            className="space-y-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Pet Name</Label>
                  <FormControl>
                    <Input type="text" placeholder="Pet name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="species"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Pet Species</Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select species" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CAT">Cat</SelectItem>
                      <SelectItem value="DOG">Dog</SelectItem>
                      <SelectItem value="BIRD">Bird</SelectItem>
                      <SelectItem value="REPTILE">Reptile</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <Label>Pet Breed</Label>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter breed (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <Label>Pet Age</Label>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter age"
                      min="0"
                      max="100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <Label>Pet Gender</Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Оновити дані
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
