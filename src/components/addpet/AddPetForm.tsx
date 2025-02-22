"use client";
import { petSchema, PetSchema } from "@/lib/schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent } from "../ui/card";
import { addingPet } from "@/lib/actions/addingpet";
import { useRouter } from "next/navigation";

const AddPetForm = () => {
  const router = useRouter();
  const form = useForm<PetSchema>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      age: undefined,
      breed: "",
      gender: "",
      name: "",
      species: "",
    },
  });

  const handlePetSubmit = async (data: PetSchema) => {
    const formdata = new FormData();
    formdata.append("age", String(data.age));
    formdata.append("breed", data.breed);
    formdata.append("gender", data.gender);
    formdata.append("species", data.species);
    formdata.append("name", data.name);
    const res = await addingPet(formdata);
    if (res.success) {
      router.push("/profile");
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-20 shadow-lg p-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Add a New Pet</h2>
        <p className="text-sm text-gray-500">
          Fill in the details to add your pet.
        </p>
      </CardHeader>
      <CardContent>
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
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
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
              Add Pet
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddPetForm;
