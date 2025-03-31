"use client";

import { useParams, useRouter } from "next/navigation";
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
  const [transaction, setTransaction] = useState<TransactionType | null>(null);
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    async function getTransaction() {
      const response = await fetch(
        `/api/me/transactions/${params.transactionId}`
      );
      const data = await response.json();
      setTransaction(data.transaction);
    }
    getTransaction();
  }, []);
  return <div className="h-screen w-full flex bg-indigo-700"></div>;
}
