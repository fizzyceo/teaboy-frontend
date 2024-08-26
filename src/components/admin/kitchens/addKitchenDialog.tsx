"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import createKitchen from "@/actions/admin/create-kitchen";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
});

const AddNewKitchenDialog = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const createdKitchen = await createKitchen(values.name);
      if (createdKitchen) {
        router.push(`/dashboard/kitchens/${createdKitchen.kitchen_id}`);
        form.reset();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="animation flex h-60 w-full cursor-pointer items-center justify-center rounded border bg-slate-200 duration-300 hover:scale-[102%] hover:bg-slate-100">
          <PlusIcon size={50} color="black" />
          <p>Add Kitchen</p>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Kitchen</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Kitchen Name Input */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="name">Kitchen Name</FormLabel>
                  <Input
                    id="name"
                    {...field}
                    placeholder="Enter Kitchen Name"
                    type="text"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <DialogFooter>
              <Button type="submit" variant="nextStep" disabled={loading}>
                {loading ? "Creating..." : "Create Kitchen"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewKitchenDialog;
