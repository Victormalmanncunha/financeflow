import { ArrowDown, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  return (
    <li
      key={id}
      className="flex justify-between items-center w-full p-2 rounded-lg shadow-sm bg-gray-100 cursor-pointer"
      onClick={() => router.push(`/dashboard/transactions/${id}`)}
    >
      <span className="flex items-center gap-2">
        {type === "INCOME" ? (
          <ArrowUp
            className="text-green-500"
            size={20}
            data-testid="arrow-up"
          />
        ) : (
          <ArrowDown
            className="text-red-500"
            size={20}
            data-testid="arrow-down"
          />
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
