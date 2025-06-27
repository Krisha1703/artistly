// SignUp Component

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../../../schemas/resgister-schema";
import { register } from "../../../actions/register";

import Modal from "./modal";
import InputField from "./input-field";
import SubmitButton from "./submit-button";
import SwitchForm from "./switch-form";

const SignUp = ({ onClose, onSwitchToLogin }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    setError("");
    setSuccess("");
  
    startTransition(() => {
      register(data).then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setSuccess(response.success);
        }
      });
    });
  };
  

  return (
    <Modal error={error} success={success} onClose={onClose} title="Sign Up">
      {/* Sign Up Form */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
        action={async (formData) => {
          
          await signIn("resend", formData)
        }}
      >
        <InputField
          label="First Name"
          id="firstName"
          type="text"
          placeholder="Enter your first name"
          register={form.register("firstName")}
          error={form.formState.errors.firstName}
          disabled={isPending}
        />

        <InputField
          label="Last Name"
          id="lastName"
          type="text"
          placeholder="Enter your last name"
          register={form.register("lastName")}
          error={form.formState.errors.lastName}
          disabled={isPending}
        />

        <div className="col-span-2">
          <InputField
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            register={form.register("email")}
            error={form.formState.errors.email}
            disabled={isPending}
          />
        </div>

        <InputField
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          register={form.register("password")}
          error={form.formState.errors.password}
          disabled={isPending}
        />

        <InputField
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          register={form.register("confirmPassword")}
          error={form.formState.errors.confirmPassword}
          disabled={isPending}
        />

        <SubmitButton type="Sign Up" disabled={isPending} />

        <div className="col-span-2 flex space-x-2">
          <SwitchForm text="Already a member?" onClick={onSwitchToLogin} main="Login"/>
        </div>
      </form>

    </Modal>
  );
};

export default SignUp;