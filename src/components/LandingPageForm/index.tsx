"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPageForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleNavigateToLogin = () => {
    router.push("/login");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      router.push(`/register?email=${encodeURI(email)}`);
    } else {
      router.push(`/register`);
    }
  };

  return (
    <form
      className="flex flex-col w-1/4 h-50 bg-white items-center justify-center rounded-4xl"
      onSubmit={handleRegister}
    >
      <input
        type="text"
        placeholder="Email"
        className="w-10/12 bg-gray-200 rounded-lg mb-5 text-2xl p-1 placeholder:text-gray-500"
        value={email}
        onChange={handleEmailChange}
      />
      <button
        className="w-9/12 bg-gray-900 p-2 text-white text-2xl rounded-2xl cursor-pointer mb-2"
        type="submit"
      >
        Cadastrar
      </button>
      <p
        className="text-gray-500 cursor-pointer"
        onClick={handleNavigateToLogin}
      >
        Já possui uma conta?
      </p>
    </form>
  );
}
