"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const forgotSchema = z.object({
  email: z.string().email(),
})

const otpSchema = z.object({
  otp: z.string().length(6),
})

const resetSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFields = z.infer<typeof loginSchema>
type ForgotFields = z.infer<typeof forgotSchema>
type OTPFields = z.infer<typeof otpSchema>
type ResetFields = z.infer<typeof resetSchema>

type Step = "login" | "forgot" | "otp" | "reset"

export default function Login() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("login")
  const [isLoading, setIsLoading] = useState(false)
  const [emailForReset, setEmailForReset] = useState("")

  const loginForm = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const forgotForm = useForm<ForgotFields>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  })

  const otpForm = useForm<OTPFields>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  })

  const resetForm = useForm<ResetFields>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  })

  async function onSubmit(values: LoginFields) {
    setIsLoading(true)
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    setIsLoading(false)
    if (res?.error) toast.error("Invalid credentials")
    else router.push("/")
  }

  async function handleSendOTP(values: ForgotFields) {
    setIsLoading(true)

    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      })

      const data = await res.json()
      console.log("Forgot Password Response:", data) // ← Check this in console!

      setIsLoading(false)

      if (data.status === "success" || data.message === "Reset code sent to your email") {
        toast.success("OTP sent to your email")
        setEmailForReset(values.email)
        resetForm.setValue("email", values.email)
        setStep("otp")
      } else {
        toast.error(data.message || "Failed to send OTP")
      }
    } catch (err) {
      setIsLoading(false)
      toast.error("Network error")
      console.error(err)
    }
  }

  async function handleVerifyOTP(values: OTPFields) {
    setIsLoading(true)

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetCode: values.otp }),
    })

    const data = await res.json()
    console.log("Verify OTP Response:", data)

    setIsLoading(false)

    if (data.status?.toLowerCase() === "success") {
      toast.success("OTP verified")
      setStep("reset")
    } else {
      toast.error(data.message || "Invalid OTP")
    }
  }

  async function handleResetPassword(values: ResetFields) {
    setIsLoading(true)

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        newPassword: values.newPassword,
      }),
    })

    const data = await res.json()
    console.log("Reset Password Response:", data)

    setIsLoading(false)

    if (data.token) {
      toast.success("Password reset successfully")
      // router.push("/login")
      setStep("login")
    } else {
      toast.error(data.message || "Failed to reset password")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="p-6 w-[360px]">
        {step === "login" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>

            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={loginForm.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={loginForm.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl><Input type="password" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button type="submit" className="w-full">
                  {isLoading && <Loader2 className="animate-spin mr-2" />}
                  Login
                </Button>
              </form>
            </Form>

            <Button variant="link" className="mt-3" onClick={() => setStep("forgot")}>
              Forgot Password?
            </Button>
          </>
        )}

        {step === "forgot" && (
          <>
            <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

            <Form {...forgotForm}>
              <form onSubmit={forgotForm.handleSubmit(handleSendOTP)} className="space-y-4">
                <FormField control={forgotForm.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button type="submit" className="w-full">
                  {isLoading && <Loader2 className="animate-spin mr-2" />}
                  Send OTP
                </Button>
              </form>
            </Form>

            <Button variant="link" onClick={() => setStep("login")}>Back to Login</Button>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
            <p className="text-sm text-gray-600 mb-4">Sent to {emailForReset}</p>

            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(handleVerifyOTP)} className="space-y-4">
                <FormField control={otpForm.control} name="otp" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button type="submit" className="w-full">
                  {isLoading && <Loader2 className="animate-spin mr-2" />}
                  Verify OTP
                </Button>
              </form>
            </Form>

            <Button variant="link" onClick={() => setStep("forgot")}>Back</Button>
          </>
        )}

        {step === "reset" && (
          <>
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>

            <Form {...resetForm}>
              <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-4">
                <FormField control={resetForm.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input {...field} disabled /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={resetForm.control} name="newPassword" render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl><Input type="password" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button type="submit" className="w-full">
                  {isLoading && <Loader2 className="animate-spin mr-2" />}
                  Reset Password
                </Button>
              </form>
            </Form>

            <Button variant="link" onClick={() => setStep("otp")}>Back</Button>
          </>
        )}

        {step === "login" && (
          <div className="mt-4 text-center">
            <Link href="/register" className="text-blue-600 underline">Create Account</Link>
          </div>
        )}
      </Card>
    </div>
  )
}