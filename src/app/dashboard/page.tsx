import CurrentBalance from "./components/CurrentBalance";
import DashboardTransactionList from "./components/DashboardTransactionList";
import UserGreeting from "./components/UserGreeting";
import { getCookie } from "cookies-next";

export default function Dashboard() {
  const token = getCookie("token");

  return (
    <div className="h-screen w-full flex bg-indigo-700">
      <main className="flex-1 flex flex-col items-center p-6 gap-6">
        <UserGreeting />
        <CurrentBalance />

        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>

          <DashboardTransactionList userId={token} />
        </div>
      </main>
    </div>
  );
}
