"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function FirstVisit({
  updateBalanceAction,
}: {
  updateBalanceAction: () => void;
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [amount, setAmount] = useState("0");
  const searchParams = useSearchParams();
  const router = useRouter;
  searchParams.delete;

  useEffect(() => {
    if (searchParams.get("firstVisit") === "true") {
      setModalIsOpen(true);
    }
  }, []);

  const handleConfirm = async () => {
    if (!isNaN(Number(amount))) {
      try {
        const response = await fetch("/api/me/balance", {
          body: JSON.stringify(amount),
          method: "POST",
        });
        const data = await response.json();
        if (response.ok && data) {
          updateBalanceAction();
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.delete("firstVisit");
          router;
          setModalIsOpen(false);
        }
      } catch (error) {}
    }
  };

  return (
    <>
      {modalIsOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-0 top-0 h-screen w-screen bg-[rgba(0,0,0,0.3)] flex justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-96 p-6 bg-white rounded-xl shadow-lg flex flex-col items-center"
          >
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Bem-vindo ao FinanceFlow!
            </h1>
            <p className="text-lg text-gray-600 mb-4 text-center">
              Para começar, informe seu saldo inicial.
            </p>
            <div className="relative w-full mb-4">
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="R$ 0,00"
              />
            </div>
            <button
              onClick={handleConfirm}
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold transition-colors duration-300"
            >
              Confirmar
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </>
  );
}
