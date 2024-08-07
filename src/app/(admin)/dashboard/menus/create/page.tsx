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
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Image, PlusIcon } from "lucide-react";

type MenuItemType = {
  id: number;
};

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  menuItems: z.array(
    z.object({
      title: z.string().min(2),
      description: z.string().optional(),
      price: z.number().min(0),
      available: z.boolean(),
    }),
  ),
});

const CreateMenuPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const [menuItems, setMenuItems] = useState<MenuItemType[]>([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ]);
  return (
    <section className="flex h-full w-full flex-col gap-4">
      <h1 className="text-xl font-semibold">Create Menu</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col justify-between gap-2"
        >
          <div className="grid w-full grid-cols-3 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-1 flex w-full flex-col text-base">
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <div className="flex w-full flex-col">
                    <FormControl className="">
                      <Input {...field} id="name" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 flex w-full flex-col text-base">
                  <FormLabel htmlFor="name">Description</FormLabel>
                  <div className="flex w-full flex-col">
                    <FormControl className="">
                      <Input {...field} id="description" />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex h-full w-full flex-col">
            <h2 className="text-lg font-medium">Menu Items</h2>
            <div className="flex h-full w-full flex-col gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex w-full items-center gap-4 border-dashed border-slate-800 bg-slate-50"
                  >
                    <PlusIcon size={20} />
                    Add Menu Item
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Add Menu Item </SheetTitle>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right text-sm">
                        title
                      </Label>
                      <Input id="title" value="Burget" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="description"
                        className="text-right text-sm"
                      >
                        Description
                      </Label>
                      <Input
                        id="description"
                        value="Good"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right text-sm">
                        Price
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        value="100"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">Save changes</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <div className="no-scrollbar flex max-h-64 w-full flex-col gap-2 overflow-scroll">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex min-h-20 w-full snap-start items-center justify-start gap-4 rounded-sm border bg-slate-50 p-2"
                  >
                    <div className="w-1/6">
                      <Image size={38} />
                    </div>
                    <p>Title</p>
                    <p>Description</p>
                    <p>Price</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button type="submit">Create Menu</Button>
        </form>
      </Form>
    </section>
  );
};

export default CreateMenuPage;
