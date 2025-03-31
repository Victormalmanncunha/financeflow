"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Transaction from "./components/Transaction";
import { ArrowDown, ArrowUp } from "lucide-react";

type TransactionType = {
  id: number;
  userId: number;
  amount: number;
  type: "INCOME" | "EXPENSE"; // Se for um enum, use os valores específicos
  category: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export default function Transactions() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function getTransactions() {
      const response = await fetch(`/api/me/transactions`);
      const data = await response.json();
      setTransactions(data.transactions);
    }
    getTransactions();
  }, []);
  return (
    <div className="h-screen w-full flex bg-indigo-700">
      <main className="flex-1 flex flex-col items-center gap-6">
        <h1 className="text-3xl text-white font-bold mt-6">Transações</h1>
        <div className="flex w-full">
          <div className="w-1/2 flex flex-col items-center">
            <h2 className="text-white text-2xl font-semibold">
              Ultimas transações
            </h2>
            <ul className="w-3/4 max-h-[80vh] flex flex-col gap-3 mt-5 overflow-y-auto">
              {transactions.map((transaction) => {
                return <Transaction {...transaction} key={transaction.id} />;
              })}
            </ul>
          </div>
          <div className="w-1/2 flex justify-center">Adicionar transação</div>
        </div>
      </main>
    </div>
  );
}
