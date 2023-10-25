"use client";
import { useState } from "react";
import { logIn } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AuthType } from "@/types/AuthType";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthType>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  return (
    <div className="flex items-center flex-col">
      <h1 className="mb-2">Login here :)</h1>
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(logIn({ ...data }));
          if (
            data.username === "testuser" &&
            data.password === "testpassword123"
          ) {
            router.push("/TablePage");
          }
        })}
        className="flex items-center flex-col border border-slate-700 rounded-xl p-5"
      >
        <div className="w-full">
          <label>Email or username</label>
          <input
            type="text"
            className="mt-2 w-full bg-slate-400 text-white bg-opacity-20 outline-black rounded-md p-1.5 leading-5 "
            {...register("username", { required: "This is required." })}
          />
          <p className="mb-5 mt-1 text-red-600">{errors.username?.message}</p>
        </div>

        <div className="w-full">
          <label>Password</label>
          <input
            type="password"
            className="mt-2 w-full bg-slate-400 text-white bg-opacity-20 outline-black rounded-md p-1.5 leading-5 "
            {...register("password", {
              required: "This is required.",
              minLength: {
                value: 4,
                message: "Min length is 4",
              },
            })}
          />

          <p className="mt-1 text-red-600">{errors.password?.message}</p>
        </div>

        <input
          className="w-40 mt-5 cursor-pointer bg-slate-100 text-black rounded-xl p-3 hover:bg-slate-300 ease-in duration-200"
          type="submit"
          value="Log In"
        />
      </form>
    </div>
  );
};

export default Login;
