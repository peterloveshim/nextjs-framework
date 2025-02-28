"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CommonProps } from "@/@types/common";

import { Button, FormItem, Form, Input } from "@/components/ui";
import PasswordInput from "@/components/shared/PasswordInput";

import classNames from "@/utils/classNames";

import type { ZodType } from "zod";

export type OnSignInPayload = {
  values: SignInFormSchema;
  setSubmitting: (isSubmitting: boolean) => void;
  setMessage: (message: string) => void;
};

export type OnSignIn = (payload: OnSignInPayload) => void;

interface SignInFormProps extends CommonProps {
  passwordHint?: string | React.ReactNode;
  setMessage: (message: string) => void;
  onSignIn?: OnSignIn;
}

type SignInFormSchema = {
  email: string;
  password: string;
  otp?: string;
};

const validationSchema: ZodType<SignInFormSchema> = z.object({
  email: z
    .string({ required_error: "Please enter your email" })
    .min(1, { message: "Please enter your email" })
    .email("This is not a valid email."),
  password: z
    .string({ required_error: "Please enter your password" })
    .min(6, { message: "Please enter your password" }),
  otp: z.string().optional(),
});

const SignInForm = ({
  className,
  setMessage,
  onSignIn,
  passwordHint,
}: SignInFormProps) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignInFormSchema>({
    defaultValues: {
      email: process.env.NEXT_PUBLIC_EMAIL ?? "",
      password: process.env.NEXT_PUBLIC_PASSWORD ?? "",
    },
    resolver: zodResolver(validationSchema),
  });

  const handleSignIn = async (values: SignInFormSchema) => {
    console.log("values : ", values);

    if (onSignIn) {
      onSignIn({ values, setSubmitting, setMessage });
    }
  };

  return (
    <div className={className}>
      <Form onSubmit={handleSubmit(handleSignIn)}>
        <FormItem
          label="Email"
          invalid={Boolean(errors.email)}
          errorMessage={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                placeholder="Email"
                autoComplete="off"
                {...field}
              />
            )}
          />
        </FormItem>
        <FormItem
          label="Password"
          invalid={Boolean(errors.password)}
          errorMessage={errors.password?.message}
          className={classNames(
            passwordHint ? "mb-0" : "",
            errors.password?.message ? "mb-8" : ""
          )}
        >
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PasswordInput
                type="text"
                placeholder="Password"
                autoComplete="off"
                {...field}
              />
            )}
          />
        </FormItem>
        {passwordHint}
        <Button block loading={isSubmitting} variant="solid" type="submit">
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </Form>
    </div>
  );
};

export default SignInForm;
