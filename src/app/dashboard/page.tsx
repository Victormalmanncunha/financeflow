import { Banknote } from "lucide-react";
import CurrentBalance from "./components/CurrentBalance";
import Transaction from "./components/Transaction";

const transactions = [
  { id: 1, type: "income", amount: 250, description: "Freelance" },
  { id: 2, type: "expense", amount: 120, description: "Supermercado" },
  { id: 3, type: "income", amount: 500, description: "Salário" },
];

export default function Dashboard() {
  return (
    <div className="h-screen w-full flex bg-indigo-700">
      <aside className="h-full w-16 bg-white flex flex-col items-center py-4 shadow-lg">
        <Banknote
          className="hover:bg-gray-200 rounded-2xl cursor-pointer hover:p"
          size={32}
        />
      </aside>

      <main className="flex-1 flex flex-col items-center p-6 gap-6">
        <h1 className="text-3xl text-white font-bold">Olá</h1>

        <CurrentBalance />

        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>

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
