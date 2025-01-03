"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import loginUser from "@/actions/auth/login-user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(8, { message: "Password too short" }),
});

const LoginPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;

    try {
      const loginResponse = await loginUser(email, password);
      console.log(loginResponse);

      if (loginResponse.statusCode) {
        toast.error(loginResponse.message);
      } else if (loginResponse.accessToken) {
        toast.success("Login Successful");
        router.push("/dashboard");
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  }

  return (
    <div className="m-auto flex h-3/4 w-4/5 flex-col items-center justify-center rounded-lg border border-gray-100 bg-slate-700 bg-opacity-10 bg-clip-padding p-4 drop-shadow-2xl backdrop-blur-sm backdrop-filter md:w-1/2 lg:w-1/2">
      <div className="mb-4 flex w-full items-center justify-center gap-3">
        <Link href={"/dashboard"}>
          <Image src={"/teaboy-logo.png"} width={35} height={35} alt={""} />
        </Link>{" "}
        <h1 className="text-center text-3xl font-semibold">Login</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col justify-center gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input {...field} id="email" type="email" />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
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
        <span>New User ?</span>
        <Link className="font-medium underline" href={"/auth/register"}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
