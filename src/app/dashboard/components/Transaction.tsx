import { ArrowDown, ArrowUp } from "lucide-react";

export default function Transaction({ id, type, description, amount }) {
  return (
    <li
      key={id}
      className="flex justify-between items-center w-full p-2 rounded-lg shadow-sm bg-gray-100"
    >
      <span className="flex items-center gap-2">
        {type === "income" ? (
          <ArrowUp className="text-green-500" size={20} />
        ) : (
          <ArrowDown className="text-red-500" size={20} />
        )}
        {description}
      </span>
      <span
        className={`font-semibold ${
          type === "income" ? "text-green-600" : "text-red-600"
        }`}
      >
        {type === "income" ? "+" : "-"} R$
        {amount.toFixed(2)}
      </span>
    </li>
  );
}
