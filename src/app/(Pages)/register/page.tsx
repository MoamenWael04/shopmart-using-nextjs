'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { registerUser } from '../products/_actions/register.Action';

// ================= SCHEMA =================
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(20, "Name too long"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-z])/, "Must contain lowercase letter")
    .regex(/(?=.*[A-Z])/, "Must contain uppercase letter")
    .regex(/(?=.*\d)/, "Must contain a number")
    .regex(/(?=.*[@$!%*?&])/, "Must contain a special character (@$!%*?&)")
    .max(50),
  rePassword: z.string(),
  phone: z.string()
    .trim()
    .refine((val) => {
      const cleaned = val.replace(/[\s\-\(\)]/g, '');
      return /^(\+?20|0)?1[0125]\d{8}$/.test(cleaned);
    }, {
      message: "Invalid Egyptian mobile number (e.g. 01012345678)",
    }),
})
.refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
});

type FormFields = z.infer<typeof formSchema>;

// ================= COMPONENT =================
export default function Register() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
  });

const onSubmit = async (values: FormFields) => {
  try {
    setIsLoading(true);

    const data = await registerUser(values);
    
    // ADD THIS LINE TO SEE THE RESPONSE
    console.log('Server response:', data);

    if (data.message === 'success') {
      toast.success('Account created successfully');
      router.push('/login');
    } else {
      // Improved error message
      toast.error(data.message || data.error || 'Registration failed');
    }
  } catch (error: any) {
    console.log('Submission error:', error);
    toast.error(error.message || 'Something went wrong');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex flex-col justify-center items-center min-h-[75vh]">
      <h3 className="my-7 text-4xl font-bold">Welcome!</h3>

      <Card className="p-5 w-sm">
        {searchParams.get('error') && (
          <h4 className="text-red-600 text-center">
            Incorrect Email or Password
          </h4>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </form>
        </Form>
      </Card>

      <div className="mt-4">
        If you already have an account,{' '}
        <Link href="/login" className="text-blue-600 underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
