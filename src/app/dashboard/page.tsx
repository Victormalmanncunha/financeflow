import CurrentBalance from "./components/CurrentBalance";
import DashboardTransactionList from "./components/DashboardTransactionList";
import UserGreeting from "./components/UserGreeting";

export default function Dashboard() {
  return (
    <div className="h-screen w-full flex bg-indigo-700">
      <main className="flex-1 flex flex-col items-center gap-6">
        <UserGreeting />
        <CurrentBalance />

        <DashboardTransactionList />
      </main>
    </div>
  );
}
