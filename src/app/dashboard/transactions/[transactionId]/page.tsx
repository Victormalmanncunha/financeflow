"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ExclusionModal from "./components/ExclusionModal";

type TransactionType = {
  id: number;
  userId: number;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  transactionDate: Date;
};

export default function Transactions() {
  const [transaction, setTransaction] = useState<TransactionType | null>(null);
  const [exclusionModalIsOpen, setExclusionModalIsOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  async function getTransaction() {
    const response = await fetch(
      `/api/me/transactions/${params.transactionId}`
    );
    const data = await response.json();
    if (response.ok) {
      setTransaction(data.transaction);
    } else {
      router.back();
    }
  }

  useEffect(() => {
    getTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!transaction) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-indigo-600 text-white text-lg font-semibold">
        Carregando detalhes da transação...
      </div>
    );
  }
  return (
    <div className="h-screen w-full bg-gradient-to-br from-indigo-700 to-indigo-900 p-8 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">
          Detalhes da Transação
        </h1>

        <div className="mb-4">
          <p className="text-gray-600 font-medium">Categoria:</p>
          <p className="text-xl font-semibold text-gray-800">
            {transaction.category}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 font-medium">Valor:</p>
          <p className="text-lg font-semibold">
            {transaction.type === "INCOME" ? "Receita" : "Despesa"}
          </p>
          <p
            className={`text-2xl font-bold ${
              transaction.type === "INCOME" ? "text-green-500" : "text-red-500"
            }`}
          >
            R$ {Number(transaction?.amount || 0).toFixed(2)}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 font-medium">Descrição:</p>
          <p className="text-lg font-semibold text-gray-700 break-words">
            {transaction.description || "Nenhuma descrição"}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 font-medium">Data da transação:</p>
          <p className="text-lg font-semibold text-gray-800">
            {new Date(`${transaction.transactionDate}`).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-10">
          <button
            onClick={() => router.back()}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg mt-6 shadow-md transition-all duration-200"
          >
            Voltar
          </button>
          <button
            onClick={() => setExclusionModalIsOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg mt-6 shadow-md transition-all duration-200"
          >
            Excluir
          </button>
        </div>
      </div>
      <ExclusionModal
        exclusionModalIsOpen={exclusionModalIsOpen}
        setExclusionModalIsOpen={() =>
          setExclusionModalIsOpen(!exclusionModalIsOpen)
        }
        transactionAmount={transaction.amount}
        transactionType={transaction.type}
        transactionId={transaction.id}
      />
    </div>
  );
}
