import { Banknote } from "lucide-react";

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
        <h1 className="text-3xl text-white font-bold">Transações</h1>
      </main>
    </div>
  );
}
