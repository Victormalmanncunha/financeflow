"use client";

import { useEffect, useState } from "react";
import Transaction from "./components/Transaction";
import { toast, ToastContainer } from "react-toastify";
import DashboardMenu from "../components/DashboardMenu";

type TransactionType = {
  id: number;
  userId: number;
  amount: number;
  type: "INCOME" | "EXPENSE"; // Se for um enum, use os valores específicos
  category: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  transactionDate: Date;
};

export default function Transactions() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const [balance, setBalance] = useState(0);
  const [balanceAfter, setBalanceAfter] = useState(0);
  const [amount, setAmount] = useState("0");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("INCOME");
  const [description, setDescription] = useState("");
  const [transactionDate, setTransactionDate] = useState(() => {
    const localDate = new Date();
    localDate.setMinutes(
      localDate.getMinutes() - localDate.getTimezoneOffset()
    );
    return localDate.toISOString().split("T")[0];
  });
  async function getTransactions() {
    const response = await fetch(`/api/me/transactions`);
    const data = await response.json();
    setTransactions(data.transactions);
  }

  async function getBalance() {
    try {
      const response = await fetch("http://localhost:3000/api/me/balance", {
        method: "GET",
      });
      const data = await response.json();
      setBalance(data.userBalance);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTransactions();
    getBalance();
  }, []);

  useEffect(() => {
    updateBalanceAfter(Number(amount), type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balance]);

  async function createTransaction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!Number(amount) || Number(amount) <= 0) {
      toast.error("Por favor, insira um valor válido maior que zero.");
      return;
    }
    if (!category.trim()) {
      toast.error("Preencha a categoria da transação.");
      return;
    }
    if (!type.trim()) {
      toast.error("Selecione o tipo da transação (Receita ou Despesa).");
      return;
    }
    if (!transactionDate.trim()) {
      toast.error("Por favor, selecione a data da transação.");
      return;
    }

    const transaction = {
      amount: Number(amount),
      category: category.trim(),
      type: type,
      description: description.trim() ? description.trim() : null,
      transactionDate: transactionDate,
    };

    const response = await fetch(`/api/me/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    const data = await response.json();

    if (response.ok) {
      toast.success("Transação criada com sucesso!");
      getTransactions();
      setAmount("0");
      setCategory("");
      setDescription("");
      setTransactionDate(() => {
        const localDate = new Date();
        localDate.setMinutes(
          localDate.getMinutes() - localDate.getTimezoneOffset()
        );
        return localDate.toISOString().split("T")[0];
      });
      setType("INCOME");
    } else {
      toast.error(data.error);
    }
  }

  const updateBalanceAfter = (amount: number, type: "INCOME" | "EXPENSE") => {
    if (!isNaN(Number(amount))) {
      setBalanceAfter(
        type === "INCOME" ? balance + Number(amount) : balance - Number(amount)
      );
    }
  };

  function groupTransactionsByDate(transactions: TransactionType[]) {
    return transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.transactionDate)
        .toISOString()
        .split("T")[0];
      if (!acc[date]) acc[date] = { transactions: [], total: 0 };

      acc[date].transactions.push(transaction);
      acc[date].total +=
        transaction.type === "INCOME"
          ? Number(transaction.amount)
          : Number(-transaction.amount);

      return acc;
    }, {} as Record<string, { transactions: TransactionType[]; total: number }>);
  }

  const groupedTransactions = groupTransactionsByDate(transactions);

  return (
    <div className="h-screen w-full flex bg-indigo-700">
      <DashboardMenu />
      <main className="flex-1 flex flex-col items-center gap-6">
        <h1 className="text-3xl text-white font-bold mt-6 mb-6">Transações</h1>
        <div className="flex w-full">
          <div className="w-1/2 flex flex-col items-center">
            <h2 className="text-white text-2xl font-semibold">
              Todas as transações
            </h2>
            <h2 className="text-white text-2xl font-semibold">
              Saldo atual: R${balance.toFixed(2)}
            </h2>
            <ul className="w-3/4 h-[70vh] flex flex-col gap-3 mt-5 overflow-y-auto">
              {Object.entries(groupedTransactions).map(([date, data]) => (
                <div key={date} className="p-4 rounded-lg flex flex-col gap-2">
                  <h2 className="text-lg font-bold text-white">
                    {new Date(date + "T00:00:00").toLocaleDateString()} - Saldo:
                    R$
                    {Number(data.total).toFixed(2)}
                  </h2>
                  {data.transactions.map((transaction) => (
                    <Transaction {...transaction} key={transaction.id} />
                  ))}
                </div>
              ))}
            </ul>
          </div>
          <div className="w-1/2 flex justify-center">
            <div className="w-4/5 flex flex-col items-center bg-white p-6 rounded-lg shadow-lg h-fit">
              <h2 className="text-indigo-700 text-2xl font-semibold mb-4">
                Adicionar Transação
              </h2>
              <form
                className="w-full flex flex-col gap-4"
                onSubmit={createTransaction}
              >
                <input
                  type="number"
                  placeholder="Valor"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => {
                    setAmount(e.target.value);
                    updateBalanceAfter(Number(e.target.value), type);
                  }}
                  value={amount}
                />
                <input
                  type="text"
                  placeholder="Categoria (ex: Lazer, Viagem)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                />
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => {
                    const selectedType = e.target.value as "INCOME" | "EXPENSE";
                    setType(selectedType);
                    updateBalanceAfter(Number(amount), selectedType);
                  }}
                  value={type}
                >
                  <option value="INCOME">Receita</option>
                  <option value="EXPENSE">Despesa</option>
                </select>
                <input
                  type="text"
                  placeholder="Descrição (Opcional)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full p-3 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-800 transition"
                >
                  Adicionar
                </button>

                <p className="w-full text-center font-bold">
                  Saldo após transação:{" "}
                  <span
                    className={`${
                      balanceAfter >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    R${balanceAfter.toFixed(2)}
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer closeOnClick limit={1} />
    </div>
  );
}
