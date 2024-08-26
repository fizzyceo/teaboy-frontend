"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import createSite from "@/actions/admin/create-site";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  phoneNumber: z.string().min(10).max(15),
  location: z.string().min(2).max(100),
  description: z.string().optional(),
  image: z
    .instanceof(File)
    .refine((file) => file.size !== 0, "Please upload an image"),
});

const AddNewSiteDialog = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      location: "",
      description: "",
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

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const createdSite = await createSite(values);
      if (createdSite) {
        router.push(`/dashboard/sites/${createdSite.site_id}`);
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
          <p>Add Site</p>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Site</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="name">Site Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      {...field}
                      placeholder="Enter Site Name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem className="row-span-2 h-auto w-full">
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
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      id="phoneNumber"
                      {...field}
                      placeholder="Enter Phone Number"
                      type="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="location">Location</FormLabel>
                  <FormControl>
                    <Input
                      id="location"
                      {...field}
                      placeholder="Enter Location"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Input
                      id="description"
                      {...field}
                      placeholder="Enter Description (optional)"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="col-span-2">
              <Button type="submit" variant="nextStep" disabled={loading}>
                {loading ? "Creating..." : "Create Site"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewSiteDialog;
