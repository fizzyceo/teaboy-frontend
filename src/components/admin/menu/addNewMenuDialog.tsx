"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import createMenu from "@/actions/menu/create-menu";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  ask_for_table: z.boolean(),
  ask_for_name: z.boolean(),
});

const AddNewMenuDialog = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ask_for_table: false,
      ask_for_name: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log("values-->", values);
    try {
      const createdMenu = await createMenu(values);
      if (createdMenu) {
        router.push(`/dashboard/menus/${createdMenu.menu_id}`);
        form.reset();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="animation flex h-60 w-full items-center justify-center rounded border bg-slate-200 duration-300 hover:scale-[102%] hover:bg-slate-100">
          <PlusIcon size={50} color="black" />
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Menu</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Menu Name Input */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="name">Menu Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      {...field}
                      placeholder="Enter Menu Name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Radio Group for Settings */}
            <FormField
              name="ask_for_name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <Label>Settings</Label>
                  <FormControl>
                    <RadioGroup
                      value={field.value ? "ask_for_name" : "ask_for_table"}
                      onValueChange={(value) => {
                        form.setValue("ask_for_name", value === "ask_for_name");
                        form.setValue(
                          "ask_for_table",
                          value === "ask_for_table",
                        );
                      }}
                      className="flex items-center gap-10"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="ask_for_name"
                          id="ask_for_name"
                          checked={form.watch("ask_for_name")}
                        />
                        <Label htmlFor="ask_for_name">Ask for Name</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="ask_for_table"
                          id="ask_for_table"
                          checked={form.watch("ask_for_table")}
                        />
                        <Label htmlFor="ask_for_table">Ask for Table</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <DialogFooter>
              <Button type="submit" variant="nextStep" disabled={loading}>
                {loading ? "Creating..." : "Create Menu"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewMenuDialog;
