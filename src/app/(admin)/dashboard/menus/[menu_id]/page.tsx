"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { ImageDown, PlusIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AddMenuItemSheet from "@/components/admin/menu/addMenuItemSheet";
import AddedMenuItemCard from "@/components/admin/menu/addMenuItemCard";
import getMenu from "@/actions/menu/get-menu";
import getMenuById from "@/actions/menu/get-menu-by-id";
import editMenu from "@/actions/menu/edit-menu";

// type MenuType = {
//   id: number;
//   title?: string;
//   description?: string;
//   price?: number;
//   menu_items: any[];
//   available?: boolean;
//   created_at?: string;
//   updated_at?: string;
// };

const formSchema = z.object({
  name: z.string().min(2),
  ask_for_name: z.boolean(),
  ask_for_table: z.boolean(),
});

const MenuDetailsPage = ({
  params,
}: {
  params: {
    menu_id: number;
  };
}) => {
  const [currentMenu, setCurrentMenu] = useState<any | null>(null);
  const [editMenuLoading, setEditMenuLoading] = useState(false);
  console.log("--*", currentMenu);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ask_for_name: true,
      ask_for_table: false,
    },
  });

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menu = await getMenuById(params.menu_id);
        if (menu) {
          setCurrentMenu(menu);
          form.setValue("name", menu.name || "");
          form.setValue("ask_for_name", menu.ask_for_name);
          form.setValue("ask_for_table", menu.ask_for_table);
        }
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      }
    };

    fetchMenu();
  }, [form, params.menu_id]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setEditMenuLoading(true);
    const editMenudata = await editMenu(currentMenu.menu_id, values);
    console.log(editMenudata);
    // setCurrentMenu(editMenudata);
    setEditMenuLoading(false);
  }

  console.log(currentMenu);

  return currentMenu === null ? (
    <p>Loading...</p>
  ) : (
    <section className="flex h-full w-full flex-col justify-start">
      <h1 className="mb-4 text-2xl font-semibold">Menu Details</h1>
      {/* Edit Menu Informations */}
      <div className="flex w-full gap-3">
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
        {/* <div className="h-full w-1/2 bg-yellow-100"></div> */}
      </div>

      {/* Menu Items */}
      <div className="mt-6 flex h-full w-full flex-col">
        <div className="flex w-full justify-start gap-4">
          <h2 className="text-2xl font-semibold">Menu Items</h2>
          <AddMenuItemSheet
            menu={currentMenu}
            setCurrentMenu={setCurrentMenu}
          />
        </div>
        <div className="grid h-full w-full grid-cols-4 grid-rows-2 gap-4 px-1 py-4">
          {currentMenu.menu_items.length === 0 ? (
            <div className="col-span-4 row-span-1 flex flex-col items-center justify-center gap-4 rounded-md bg-slate-200">
              <p>No menu items added yet.</p>
            </div>
          ) : (
            currentMenu.menu_items.map((item: any) => (
              <AddedMenuItemCard key={item.id} {...item} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuDetailsPage;
