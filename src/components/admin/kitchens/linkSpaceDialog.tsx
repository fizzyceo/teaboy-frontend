"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Link, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const formSchema = z.object({
  spaceId: z.string().nonempty("You must select a space"),
});

const LinkSpaceDialog = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spaceId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      console.log("Selected Space ID:", values.spaceId);
      form.reset();
    } finally {
      setLoading(false);
    }
  };

  const spaces = [
    { id: "1", name: "Space A" },
    { id: "2", name: "Space B" },
    { id: "3", name: "Space C" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex w-full items-center justify-center space-x-3 rounded-md text-lg">
          <Link />
          <span>Link Space</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Link Space</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Space Select Input */}
            <FormField
              control={form.control}
              name="spaceId"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="spaceId">Select Space</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="spaceId">
                      <SelectValue placeholder="Choose a space" />
                    </SelectTrigger>
                    <SelectContent>
                      {spaces.map((space) => (
                        <SelectItem key={space.id} value={space.id}>
                          {space.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Link Button */}
            <DialogFooter>
              <Button type="submit" variant="default" disabled={loading}>
                {loading ? "Linking..." : "Link Space"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LinkSpaceDialog;
