"use client";

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

export default function DashboardTransactionList({ userId }) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    async function getTransactions() {
      const idResponse = await fetch("/api/user/id");
      const id = await idResponse.json();

      const response = await fetch("/api/transactions/");
    }
    getTransactions();
  }, []);

  return (
    <ul className="w-full space-y-2">
      {transactions.map((transaction) => (
        <Transaction {...transaction} key={transaction.id} />
      ))}
    </ul>
  );
}
