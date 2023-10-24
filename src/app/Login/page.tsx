"use client";
import { useState } from "react";
import { logIn } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  // const onClickLogIn = () => {
  //   dispatch(logIn({ username, password }));
  // };

  const onClickLogIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logIn({ username, password }));
    if (username === "testuser" && password === "testpassword123") {
      // Якщо логін і пароль правильні, то виконайте авторизацію, наприклад, відправте запит на сервер.
      router.push("/Table");
      // Очистіть повідомлення про помилку.
      setError("");
    } else {
      // Якщо логін або пароль неправильні, встановіть повідомлення про помилку.
      setError("Incorrect login or password");
    }
  };

  return (
    <div className="flex items-center flex-col">
      <h1 className="mb-2">Login here :)</h1>
      <form className="flex items-center flex-col border border-slate-700 rounded-xl p-5">
        <div className="w-full">
          <label>Email or username</label>
          <input
            type="text"
            className="mb-5 mt-2 w-full bg-slate-400 text-white bg-opacity-20 outline-black rounded-md p-1.5 leading-5 "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label>Password</label>
          <input
            type="password"
            className="mt-2 w-full bg-slate-400 text-white bg-opacity-20 outline-black rounded-md p-1.5 leading-5 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="self-start text-red-500">{error}</div>}
        </div>
        <button
          className="w-40 mt-3 bg-slate-100 text-black rounded-xl p-3 hover:bg-slate-300 ease-in duration-200"
          onClick={onClickLogIn}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
