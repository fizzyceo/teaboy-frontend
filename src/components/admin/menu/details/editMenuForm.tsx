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
        className="flex h-auto w-full flex-col justify-between gap-3"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex h-auto w-full flex-col justify-center">
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
            <FormItem className="flex h-auto w-full flex-col">
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
                  className="flex w-full items-center gap-10"
                >
                  <div className="flex items-center space-x-2">
                    <Label
                      className="text-sm font-normal"
                      htmlFor="ask_for_name"
                    >
                      Ask for Name:{" "}
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
        <div className="flex flex-col">
          <Button type="submit">
            {editMenuLoading ? "Saving..." : "Save"}
          </Button>
          <div className="flex w-full flex-wrap justify-between gap-x-10">
            <p className="space-x-3 text-xs">
              <b>Created:</b>
              <span>
                {currentMenu.created_at &&
                  new Date(currentMenu.created_at).toLocaleString()}
              </span>
            </p>
            <p className="space-x-3 text-xs">
              <b>Last Modified:</b>
              <span>
                {currentMenu.updated_at &&
                  new Date(currentMenu.updated_at).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditMenuForm;
