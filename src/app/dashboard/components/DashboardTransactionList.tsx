"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Transaction from "./Transaction";
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

export default function DashboardTransactionList() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function getTransactions() {
      const response = await fetch(`/api/me/transactions`);
      const data = await response.json();
      setTransactions(data.transactions.slice(0, 3));
    }
    getTransactions();
  }, []);

  const handleNavigateToTransactions = () => {
    router.push("/dashboard/transactions");
  };

  return (
    <div
      className="bg-white p-6 h-fit rounded-xl shadow-lg w-full max-w-sm flex flex-col items-center"
      data-testid="dashboard-transaction-list"
    >
      <h2
        className="text-xl font-semibold mb-4 cursor-pointer"
        onClick={handleNavigateToTransactions}
      >
        Últimas Transações
      </h2>

      <ul className="w-full space-y-2">
        {transactions.map((transaction) => (
          <Transaction {...transaction} key={transaction.id} />
        ))}
      </ul>
      <button
        className="mt-5 bg-green-500 p-3 rounded-2xl cursor-pointer"
        onClick={handleNavigateToTransactions}
      >
        Adicionar transação
      </button>
    </div>
  );
}
