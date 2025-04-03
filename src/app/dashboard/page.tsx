import CurrentBalance from "./components/CurrentBalance";
import DashboardMenu from "./components/DashboardMenu";
import DashboardTransactionList from "./components/DashboardTransactionList";
import UserGreeting from "./components/UserGreeting";

export default async function Dashboard() {
  return (
    <div className="h-screen w-full flex bg-indigo-700">
      <DashboardMenu />
      <main className="flex-1 flex flex-col items-center gap-6">
        <UserGreeting />
        <div className="w-full h-full flex justify-center gap-5">
          <CurrentBalance />
          <DashboardTransactionList />
        </div>
      </main>
    </div>
  );
}
