"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { set, useForm } from "react-hook-form";
import { z } from "zod";

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
import Link from "next/link";
import Phone from "@/components/ui/phone-intput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import registerUser from "@/actions/auth/register-user";
import { toast } from "sonner";
import { Send } from "lucide-react";

const formSchema = z
  .object({
    email: z.string().email({ message: "Enter a valid email" }),
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    password: z.string().min(8, { message: "Password too short" }),
    confirmPassword: z.string().min(8, { message: "Password too short" }),
    name: z
      .string()
      .min(3, { message: "Name too short" })
      .max(20, { message: "Name too long" }),
    role: z.enum(["ADMIN", "TEABOY", "NORMAL_USER"]).default("NORMAL_USER"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const RegisterPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      confirmPassword: "",
      name: "",
      role: "NORMAL_USER",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const { email, password, phone, name, role } = values;

    const registerResponse = await registerUser({
      email,
      password,
      phone,
      name,
      role,
    });

    console.log(registerResponse);

    if (registerResponse.user_id) {
      toast.success("User registered successfully");
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000);
    }
  }

  return (
    <div className="m-auto flex h-3/4 w-4/5 flex-col items-center justify-center rounded-lg bg-white bg-opacity-80 p-4 drop-shadow-2xl md:w-1/2 lg:w-1/2">
      <h1 className="mb-4 w-full text-center text-3xl font-semibold">
        Register
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col justify-center gap-4"
        >
          <div className="lg:flex-rol flex w-full flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 lg:w-1/2">
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input {...field} id="name" type="text" />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 lg:w-1/2">
                  <FormControl>
                    <Phone
                      name={"phone"}
                      control={form.control}
                      label={"Phone"}
                      placeholder={"Phone number"}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="lg:flex-rol flex w-full flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 lg:w-1/2">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input {...field} id="email" type="email" />
                  </FormControl>
                  <FormMessage className="text-sm">
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 lg:w-1/2">
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="TEABOY">Teaboy</SelectItem>
                      <SelectItem value="NORMAL_USER">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage>
                    {form.formState.errors.role?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="lg:flex-rol flex w-full flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 lg:w-1/2">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input {...field} id="password" type="password" />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 lg:w-1/2">
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input {...field} id="confirmPassword" type="password" />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.confirmPassword?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            variant={"sendOrder"}
            className="flex-center flex w-full items-center gap-4 text-xl font-semibold"
          >
            <span>Submit</span>
            <Send />
          </Button>
        </form>
      </Form>
      <p className="mt-2 w-full space-x-4">
        <span>Already a User ?</span>
        <Link className="font-medium underline" href={"/auth/login"}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
