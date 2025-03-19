import LandingPageForm from "@/components/LandingPageForm";

export default function LandingPage() {
  return (
    <div className="h-full w-full flex flex-col bg-indigo-700">
      <header className="w-full h-16 flex items-center justify-between text-white bg-gray-900">
        <h1 className="text-3xl ml-5">FinanceFlow</h1>
        <nav className="mr-5">
          <ul className="flex gap-5">
            <li className="cursor-pointer">Sobre</li>
            <li className="cursor-pointer">Contato</li>
          </ul>
        </nav>
      </header>
      <main className="grow w-full flex items-center justify-around">
        <p className="text-center text-2xl text-white">
          #1 aplicativo de gerenciamento de finanças.
        </p>
        <LandingPageForm />
      </main>
    </div>
  );
}
