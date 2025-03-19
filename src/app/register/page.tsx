"use client";

import { useEffect, useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    if (email) {
      setEmail(email);
    }
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleRegister = async () => {};

  return (
    <div className="h-full w-full flex justify-center items-center bg-indigo-700">
      <form
        className="flex flex-col w-1/3 h-[32rem] bg-white items-center justify-center rounded-4xl gap-2"
        action={handleRegister}
      >
        <h1 className="text-3xl">Cadastro</h1>
        <div className="flex flex-col w-3/4">
          <label htmlFor="phoneNumber" className="text-lg">
            Nome
          </label>
          <input
            type="tel"
            name="phoneNumber"
            className="bg-gray-200 rounded-lg text-lg p-2 placeholder:text-gray-500"
            placeholder="Enter your phone number..."
          />
        </div>
        <div className="flex flex-col w-3/4">
          <label htmlFor="email" className="text-lg">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="bg-gray-200 rounded-lg text-lg p-2 placeholder:text-gray-500"
            placeholder="Coloque seu email..."
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="flex flex-col w-3/4">
          <label htmlFor="phoneNumber" className="text-lg">
            Número de telefone
          </label>
          <input
            type="tel"
            name="phoneNumber"
            className="bg-gray-200 rounded-lg text-lg p-2 placeholder:text-gray-500"
            placeholder="Coloque seu telefone..."
          />
        </div>
        <div className="flex flex-col w-3/4">
          <label htmlFor="password" className="text-lg">
            Senha
          </label>
          <small className="text-gray-400">
            Deve conter 8 ou mais caracteres
          </small>
          <input
            type="password"
            className="bg-gray-200 rounded-lg text-lg p-2 placeholder:text-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-3/4 bg-gray-900 p-2 text-white text-2xl rounded-2xl cursor-pointer mt-5"
        >
          Cadastrar
        </button>
        <p>Já tem uma conta?</p>
      </form>
    </div>
  );
}
