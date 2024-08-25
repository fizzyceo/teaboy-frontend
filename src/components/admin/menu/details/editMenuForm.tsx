"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import editMenu from "@/actions/menu/edit-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
const formSchema = z.object({
  name: z.string().min(2),
  ask_for_name: z.boolean(),
  ask_for_table: z.boolean(),
});

const EditMenuForm = ({ currentMenu }: { currentMenu: any }) => {
  const [editMenuLoading, setEditMenuLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentMenu.name || "",
      ask_for_name: currentMenu.ask_for_name,
      ask_for_table: currentMenu.ask_for_table,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setEditMenuLoading(true);
    await editMenu(currentMenu.menu_id, values);
    setEditMenuLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-auto w-full flex-col gap-4 pt-2"
      >
        <div className="mb-2 flex h-auto items-end justify-between text-xs">
          <h1 className="text-3xl font-semibold">Menu Details</h1>
          <div className="flex flex-col items-end gap-0">
            <p className="space-x-2">
              <b>Created:</b>
              <span>
                {currentMenu.created_at &&
                  new Date(currentMenu.created_at).toLocaleString()}
              </span>
            </p>
            <p className="space-x-2">
              <b>Last Modified:</b>
              <span>
                {currentMenu.updated_at &&
                  new Date(currentMenu.updated_at).toLocaleString()}
              </span>
            </p>
          </div>
        </div>

        <div className="flex h-full w-full items-end gap-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-3/5 flex-col justify-start">
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input {...field} id="name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="ask_for_name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-3/5 flex-col justify-between">
                <FormLabel>Settings</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value ? "ask_for_name" : "ask_for_table"}
                    onValueChange={(value) => {
                      if (value === "ask_for_name") {
                        form.setValue("ask_for_name", true);
                        form.setValue("ask_for_table", false);
                      } else {
                        form.setValue("ask_for_name", false);
                        form.setValue("ask_for_table", true);
                      }
                    }}
                    className="flex h-10 w-full gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <Label
                        className="text-sm font-normal"
                        htmlFor="ask_for_name"
                      >
                        Ask for Name:
                      </Label>
                      <RadioGroupItem
                        value="ask_for_name"
                        id="ask_for_name"
                        checked={form.watch("ask_for_name")}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label
                        className="text-sm font-normal"
                        htmlFor="ask_for_table"
                      >
                        Ask for Table:
                      </Label>
                      <RadioGroupItem
                        value="ask_for_table"
                        id="ask_for_table"
                        checked={form.watch("ask_for_table")}
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-1/4">
            {editMenuLoading ? "Saving..." : "Save"}
          </Button>
        </div>
        {/* 
        <div className="flex w-full justify-between gap-4">
        </div> */}
      </form>
    </Form>
  );
};

export default EditMenuForm;
