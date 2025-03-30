"use client";
import { clinicreviews } from "@/lib/actions/clinicreviews";
import { clinicReviewsSchema, ClinicReviewsSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
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

export default function AddingClinicReviews({
  clinicId,
  userId,
}: {
  clinicId: string;
  userId: string;
}) {
  const form = useForm<ClinicReviewsSchema>({
    resolver: zodResolver(clinicReviewsSchema),
    defaultValues: {
      rating: "",
      comment: "",
    },
  });
  const handleReviesPost = async (data: ClinicReviewsSchema) => {
    try {
      const formdata = new FormData();
      formdata.append("clinicId", clinicId);
      formdata.append("userId", userId);
      formdata.append("comment", data.comment ?? "");
      formdata.append("rating", data.rating);
      await clinicreviews(formdata);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleReviesPost)}>
        <FormField
          name="comment"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label>Залиште відгук</Label>
              <FormControl>
                <Input type="text" placeholder="Ваш відгук" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="rating"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Label>Оцініть клініку</Label>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  placeholder="Оцінка"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Надіслати відгук</button>
      </form>
    </Form>
  );
}
