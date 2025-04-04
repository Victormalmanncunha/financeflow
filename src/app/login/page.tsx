"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const urlParams = useSearchParams();
  const successMessage = urlParams.get("success");

  const handleNavigateToRegister = () => {
    router.push("/register");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();

    if (!email || !password) {
      toast.warn("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: email,
        userPassword: password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      if (data.firstVisit) {
        router.push("/dashboard?firstVisit=true");
      } else {
        router.push("/dashboard");
      }
    } else {
      toast.error(data.error);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center bg-indigo-700">
      <form
        className="flex flex-col w-1/3 h-fit bg-white items-center justify-center rounded-4xl gap-2"
        onSubmit={handleLogin}
      >
        {successMessage === "registered" && (
          <p className="bg-green-500 text-white mt-5 p-1 rounded-md">
            Cadastro realizado com sucesso! Faça login.
          </p>
        )}
        <h1 className="text-3xl mt-2">Login</h1>
        <div className="flex flex-col w-3/4">
          <label htmlFor="email" className="text-lg">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-200 rounded-lg text-lg p-2 placeholder:text-gray-500"
            placeholder="Coloque seu email..."
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="flex flex-col w-3/4">
          <label htmlFor="password" className="text-lg">
            Senha
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-200 rounded-lg text-lg p-2 placeholder:text-gray-500"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button
          type="submit"
          className="w-3/4 bg-gray-900 p-2 text-white text-2xl rounded-2xl cursor-pointer mt-5"
        >
          Entrar
        </button>
        <p
          className="mb-5 text-gray-500 cursor-pointer"
          onClick={handleNavigateToRegister}
        >
          Não tem uma conta?
        </p>
      </form>
      <ToastContainer limit={1} />
    </div>
  );
}
