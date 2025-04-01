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
        <h2 className="text-xl font-semibold">Додати нового улюбленця</h2>
        <p className="text-sm text-gray-500">
          Заповніть дані, щоб додати улюбленця.
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
                  <Label>Ім'я улюбленця</Label>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ім'я улюбленця"
                      {...field}
                    />
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
                  <Label>Вид улюбленця</Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Оберіть вид" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CAT">Кішка</SelectItem>
                      <SelectItem value="DOG">Собака</SelectItem>
                      <SelectItem value="BIRD">Птах</SelectItem>
                      <SelectItem value="REPTILE">Рептилія</SelectItem>
                      <SelectItem value="OTHER">Інше</SelectItem>
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
                  <Label>Порода</Label>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Вкажіть породу (необов'язково)"
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
                  <Label>Вік улюбленця</Label>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Вкажіть вік"
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
                  <Label>Стать улюбленця</Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Оберіть стать" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MALE">Чоловіча</SelectItem>
                      <SelectItem value="FEMALE">Жіноча</SelectItem>
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
              Додати улюбленця
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddPetForm;
