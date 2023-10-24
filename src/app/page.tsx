"use client";
import Login from "./Login/page";
import { useAppSelector } from "@/redux/store";

export default function Home() {
  const username = useAppSelector((state) => state.authReducer.value.username);
  const password = useAppSelector((state) => state.authReducer.value.password);
  return (
    <div>
      <div className="h-screen flex m-auto items-center justify-center bg-cover bg-black text-white">
        <Login />
      </div>
    </div>
  );
}
