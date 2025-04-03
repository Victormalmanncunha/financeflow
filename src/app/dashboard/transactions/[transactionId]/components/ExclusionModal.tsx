"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function ExclusionModal({
  exclusionModalIsOpen,
  setExclusionModalIsOpen,
  transactionAmount,
  transactionType,
  transactionId,
}: {
  exclusionModalIsOpen: boolean;
  setExclusionModalIsOpen: () => void;
  transactionAmount: number;
  transactionType: string;
  transactionId: number;
}) {
  const [userBalance, setUserBalance] = useState(0);
  const [returnToPreviousBalance, setReturnToPreviousBalance] = useState(true);
  const router = useRouter();

  async function handleDeleteTransaction({
    transactionId,
    returnToPreviousBalance,
  }: {
    transactionId: number;
    returnToPreviousBalance: boolean;
  }) {
    const response = await fetch(`/api/me/transactions/${transactionId}`, {
      method: "DELETE",
      body: JSON.stringify({
        returnToPreviousBalance,
      }),
    });
    if (response.ok) {
      router.back();
    }
  }

  async function getBalance() {
    try {
      const response = await fetch("http://localhost:3000/api/me/balance", {
        method: "GET",
      });
      const data = await response.json();
      setUserBalance(data.userBalance);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBalance();
  }, []);

  if (!exclusionModalIsOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl flex flex-col items-center text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Excluir transação
        </h2>

        <p className="text-gray-600 mb-4">
          Gostaria de retornar o saldo para o saldo anterior?
        </p>
        <input
          type="checkbox"
          className="mb-4 w-5 h-5 accent-indigo-500"
          checked={returnToPreviousBalance}
          onChange={(e) => setReturnToPreviousBalance(e.target.checked)}
        />

        <div className="w-full text-left">
          <p className="text-gray-600 font-medium">Seu saldo atual:</p>
          <p
            className={`text-lg font-semibold ${
              transactionAmount >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            R$ {Number(userBalance || 0).toFixed(2)}
          </p>

          <p className="text-gray-600 font-medium mt-4">
            Saldo após excluir a transação:
          </p>

          {returnToPreviousBalance ? (
            <p
              className={`text-lg font-semibold ${
                (transactionType === "INCOME"
                  ? Number(userBalance) - Number(transactionAmount)
                  : Number(userBalance) + Number(transactionAmount)) >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              R${" "}
              {(transactionType === "INCOME"
                ? Number(userBalance) - Number(transactionAmount)
                : Number(userBalance) + Number(transactionAmount)
              ).toFixed(2)}
            </p>
          ) : (
            <p
              className={`text-lg font-semibold ${
                Number(userBalance) >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              R$ {Number(userBalance).toFixed(2)}
            </p>
          )}
        </div>

        <div className="flex gap-4 mt-6 w-full">
          <button
            onClick={() => setExclusionModalIsOpen()}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition-all duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={() =>
              handleDeleteTransaction({
                transactionId,
                returnToPreviousBalance,
              })
            }
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all duration-200"
          >
            Excluir
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
