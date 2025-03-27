"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Transaction from "../components/Transaction";

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
        <div>
          <ul className="w-full space-y-2">
            {transactions.map((transaction) => (
              <Transaction {...transaction} key={transaction.id} />
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
