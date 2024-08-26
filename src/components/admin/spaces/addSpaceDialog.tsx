"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import createSpace from "@/actions/admin/create-space";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  site_id: z.number(),
});

const AddNewSpaceDialog = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const my_sites = [
    {
      site_id: 1,
      site_name: "Site 1",
    },
    {
      site_id: 2,
      site_name: "Site 2",
    },
    {
      site_id: 3,
      site_name: "Site 3",
    },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      site_id: my_sites[0].site_id,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const createdSpace = await createSpace(values);
      if (createdSpace) {
        router.push(`/dashboard/spaces/${createdSpace.space_id}`);
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
          <p>Add Space</p>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Space</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            {/* Space Name Input */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-1 flex flex-col gap-2">
                  <FormLabel htmlFor="name">Space Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      {...field}
                      placeholder="Enter Space Name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Select Dropdown for Site */}
            <FormField
              control={form.control}
              name="site_id"
              render={({ field }) => (
                <FormItem className="col-span-1 flex flex-col gap-2">
                  <FormLabel>Select Site</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a site" />
                      </SelectTrigger>
                      <SelectContent>
                        {my_sites.map((site) => (
                          <SelectItem
                            key={site.site_id}
                            value={site.site_id.toString()}
                          >
                            {site.site_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <DialogFooter className="col-span-2">
              <Button type="submit" variant="nextStep" disabled={loading}>
                {loading ? "Creating..." : "Create Space"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewSpaceDialog;
