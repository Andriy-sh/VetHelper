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
import { Baby, Bird, Cat, Dog, Heart, PawPrint, Snowflake } from "lucide-react";
import { FaFemale, FaMale } from "react-icons/fa";

const AddPetForm = ({ userId }: { userId: string }) => {
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
    }
    router.push(`/profile/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <Card className="max-w-xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-100">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-2">
            <PawPrint className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Додати нового улюбленця
          </h2>
          <p className="text-sm text-gray-500">
            Заповніть інформацію про вашого улюбленця
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlePetSubmit)}
              className="space-y-6"
            >
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-pink-500" />
                      Ім&apos;я улюбленця
                    </Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Введіть ім'я"
                        className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
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
                    <Label className="flex items-center gap-2">
                      <PawPrint className="w-4 h-4 text-orange-500" />
                      Вид улюбленця
                    </Label>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="rounded-lg border-gray-200">
                          <SelectValue placeholder="Оберіть вид" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          value="CAT"
                          className="flex items-center gap-2"
                        >
                          <Cat className="w-4 h-4" /> Кішка
                        </SelectItem>
                        <SelectItem
                          value="DOG"
                          className="flex items-center gap-2"
                        >
                          <Dog className="w-4 h-4" /> Собака
                        </SelectItem>
                        <SelectItem
                          value="BIRD"
                          className="flex items-center gap-2"
                        >
                          <Bird className="w-4 h-4" /> Птах
                        </SelectItem>
                        <SelectItem
                          value="REPTILE"
                          className="flex items-center gap-2"
                        >
                          <Snowflake className="w-4 h-4" /> Рептилія
                        </SelectItem>
                        <SelectItem value="OTHER">Інше</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="flex items-center gap-2">
                        <PawPrint className="w-4 h-4 text-purple-500" />
                        Порода
                      </Label>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Вкажіть породу"
                          className="rounded-lg border-gray-200"
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
                      <Label className="flex items-center gap-2">
                        <Baby className="w-4 h-4 text-cyan-500" />
                        Вік улюбленця
                      </Label>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Вкажіть вік"
                          min="0"
                          max="100"
                          className="rounded-lg border-gray-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <Label className="flex items-center gap-2">
                      <FaMale className="w-4 h-4 text-blue-500" />
                      <FaFemale className="w-4 h-4 text-pink-500" />
                      Стать улюбленця
                    </Label>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="rounded-lg border-gray-200">
                          <SelectValue placeholder="Оберіть стать" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          value="MALE"
                          className="flex items-center gap-2"
                        >
                          <FaMale className="w-4 h-4 text-blue-500" /> Чоловіча
                        </SelectItem>
                        <SelectItem
                          value="FEMALE"
                          className="flex items-center gap-2"
                        >
                          <FaFemale className="w-4 h-4 text-pink-500" /> Жіноча
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <PawPrint className="w-5 h-5" />
                Додати улюбленця
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPetForm;
