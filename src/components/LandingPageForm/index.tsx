"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPageForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleRegister = () => {
    if (email.trim()) {
      router.push(`/cadastro?email=${encodeURI(email)}`);
    }
  };

  return (
    <form className="flex flex-col w-1/4 h-50 bg-white items-center rounded-4xl">
      <input
        type="text"
        placeholder="Email"
        className="w-10/12 border-gray-300 border-2 rounded-lg m-5 text-2xl"
        value={email}
        onChange={handleEmailChange}
      />
      <button
        className="w-9/12 bg-gray-900 p-2 text-white text-2xl rounded-2xl"
        onClick={handleRegister}
      >
        Cadastrar
      </button>
    </form>
  );
}
