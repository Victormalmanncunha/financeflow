"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { InputMask } from "@react-input/mask";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    if (email) {
      setEmail(email);
    }
  }, []);

  const handleNavigateToLogin = () => {
    router.push("/login");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.dismiss();

    if (!name || !email || !phoneNumber || !password) {
      toast.warn("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    if (phoneNumber.replace(/\D/g, "").length !== 11) {
      toast.warn("Digite um telefone válido.");
      return;
    }

    if (password.length < 8) {
      toast.warn("A senha deve conter pelo menos 8 caracteres.");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: name,
        userEmail: email,
        userPhone: phoneNumber.replace(/\D/g, ""),
        userPassword: password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/login?success=registered");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center bg-indigo-700">
      <form
        className="flex flex-col w-1/3 h-[32rem] bg-white items-center justify-center rounded-4xl gap-2"
        onSubmit={handleRegister}
      >
        <h1 className="text-3xl">Cadastro</h1>
        <div className="flex flex-col w-3/4">
          <label htmlFor="name" className="text-lg">
            Nome
          </label>
          <input
            type="text"
            name="name"
            className="bg-gray-200 rounded-lg text-lg p-2 placeholder:text-gray-500"
            placeholder="Coloque seu nome..."
            value={name}
            onChange={handleNameChange}
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

          <InputMask
            mask="(__) _____-____"
            replacement={{ _: /\d/ }}
            type="tel"
            name="phoneNumber"
            className="bg-gray-200 rounded-lg text-lg p-2 placeholder:text-gray-500"
            placeholder="Coloque seu telefone..."
            value={phoneNumber}
            onChange={handlePhoneChange}
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
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button
          type="submit"
          className="w-3/4 bg-gray-900 p-2 text-white text-2xl rounded-2xl cursor-pointer mt-5"
        >
          Cadastrar
        </button>
        <p
          className="mb-5 text-gray-500 cursor-pointer"
          onClick={handleNavigateToLogin}
        >
          Já tem uma conta?
        </p>
      </form>
      <ToastContainer closeOnClick limit={1} />
    </div>
  );
}
