"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import createMenuItem from "@/actions/menu/create-menu-item";
import AddMenuItemOptions from "../options/addMenuItemOptions";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.number().default(0).optional(),
  image: z
    .instanceof(File)
    .refine((file) => file.size !== 0, "Please upload an image"),
});

const AddMenuItemSheet = ({
  menu,
  setMenu,
}: {
  menu: any;
  setMenu: (menu: any) => void;
}) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [createMenuItemLoading, setCreateMenuItemLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      image: new File([""], "filename"),
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("image", acceptedFiles[0]);
        form.clearErrors("image");
      } catch (error) {
        setPreview(null);
        form.resetField("image");
      }
    },
    [form],
  );

  const [stepIndex, setStepIndex] = useState(2);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setCreateMenuItemLoading(true);
    const response = await createMenuItem(values, menu.menu_id);
    console.log("response->", response);
    if (response.error) {
      toast.error(response.errors[0]);
      setCreateMenuItemLoading(false);
    } else {
      toast.success(`Image uploaded successfully 🎉 ${values.image.name}`);
      setMenu((prevMenu: any) => ({
        ...prevMenu,
        menu_items: [
          ...prevMenu.menu_items,
          {
            ...response,
            description: "",
            options: response.menuItem_options,
          },
        ],
      }));
      setCreateMenuItemLoading(false);
    }
    setTimeout(() => {
      setStepIndex(2);
    }, 1000);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="h-8 border-slate-800 bg-slate-200 font-semibold"
        >
          <PlusIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>
            {stepIndex === 1 ? "[1/2] Add Menu Item" : "[2/2] Add Options"}
          </SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-1 flex-col"
          >
            {stepIndex === 1 ? (
              <div className="no-scrollbar mt-2 flex w-full flex-col gap-4 px-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input id="title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input id="description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input id="price" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem className="h-auto w-full">
                      <FormLabel>Upload Image</FormLabel>
                      <FormControl>
                        <div
                          {...getRootProps()}
                          className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-2"
                        >
                          {preview ? (
                            <Image
                              src={preview as string}
                              alt="Uploaded image"
                              width={150}
                              height={150}
                              className="h-full w-full rounded-lg object-cover"
                            />
                          ) : (
                            <>
                              <ImagePlus className="size-10" />
                              <Input {...getInputProps()} type="file" />
                              {isDragActive ? (
                                <p className="text-center text-xs">
                                  Drop the image!
                                </p>
                              ) : (
                                <p className="text-center text-xs">
                                  Click here or drag an image to upload it
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </FormControl>

                      <FormMessage>
                        {fileRejections.length !== 0 && (
                          <p>
                            Image must be less than 1MB and of type png, jpg, or
                            jpeg
                          </p>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <AddMenuItemOptions />
            )}

            <SheetFooter className="mt-auto">
              <Button
                type="submit"
                className="w-1/2"
                disabled={createMenuItemLoading}
              >
                {stepIndex === 1
                  ? createMenuItemLoading
                    ? "Creating Menu Item"
                    : "Create Menu Item"
                  : "Validate Options"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default AddMenuItemSheet;
