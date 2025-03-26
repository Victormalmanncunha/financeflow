import { ArrowDown, ArrowUp } from "lucide-react";

type TransactionProps = {
  id: number;
  userId: number;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export default function Transaction({
  id,
  amount,
  type,
  category,
}: TransactionProps) {
  return (
    <li
      key={id}
      className="flex justify-between items-center w-full p-2 rounded-lg shadow-sm bg-gray-100"
    >
      <span className="flex items-center gap-2">
        {type === "INCOME" ? (
          <ArrowUp className="text-green-500" size={20} />
        ) : (
          <ArrowDown className="text-red-500" size={20} />
        )}
        {category}
      </span>
      <span
        className={`font-semibold ${
          type === "INCOME" ? "text-green-600" : "text-red-600"
        }`}
      >
        {type === "INCOME" ? "+" : "-"} R$
        {Number(amount).toFixed(2)}
      </span>
    </li>
  );
}
