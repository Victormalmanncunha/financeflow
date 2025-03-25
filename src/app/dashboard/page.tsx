import { Banknote } from "lucide-react";
import React from "react";

export default async function Dashboard() {
  const response = await fetch("http://localhost:3000/api/user/balance", {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Se precisar enviar algum cabeçalho
    },
    credentials: "same-origin", // Isso garante que os cookies sejam enviados
  });

  return (
    <div className="h-screen w-full flex bg-indigo-700">
      <aside className="h-full w-16 bg-white flex flex-col items-center py-4 shadow-lg">
        <Banknote
          className="hover:bg-gray-200 rounded-2xl cursor-pointer hover:p"
          size={32}
        />
      </aside>

      <main className="flex-1 flex flex-col items-center p-6">
        <h1 className="text-3xl text-white font-bold mb-6">Olá </h1>

        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm flex flex-col items-center">
          <p className="text-xl font-semibold">Saldo atual</p>
          <p className="text-2xl font-bold text-green-600"></p>
        </div>
      </main>
    </div>
  );
}
