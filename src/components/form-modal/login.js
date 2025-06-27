// Login Component

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../../schemas/login-schema";
import { login } from "../../../actions/login";
import { useTransition } from "react";
import useUserStore from "@/app/state/store";

import Modal from "./modal";
import InputField from "./input-field";
import SubmitButton from "./submit-button";
import SwitchForm from "./switch-form";

const Login = ({ onClose, onSwitchToSignUp }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const setUser = useUserStore((state) => state.setUser);


  const form = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const onSubmit = (data) => {
    setError(""); 
    setSuccess("");  

    startTransition(() => {
      login(data)
        .then((result) => {
          if (result.error) {
            setError(result.error); 
          } else {
            setSuccess(result.success);  
            setUser({
              firstName: result.firstName,
              lastName: result.lastName,
              email: result.email,
              role: result.role,
              createdAt: result.createdAt,
              lastLoginAt: new Date().toISOString(),
            });

          }
        });
    });
  };

  return (
    <Modal error={error} success={success} onClose={onClose} title="Login">
      {/* Login Form */}
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <InputField
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
          register={form.register("email")}
          error={form.formState.errors.email}
          disabled={isPending}
        />

        <InputField
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          register={form.register("password")}
          error={form.formState.errors.password}
          disabled={isPending}
        />

        <SubmitButton type="Login" disabled={isPending} />

        <div className="flex justify-between items-center">
          <SwitchForm text="Not a member?" onClick={onSwitchToSignUp} main="Sign Up"/>
        </div>

      </form>

    </Modal>
  );
};

export default Login;
