"use client";

import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DashboardMenu() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/me/logout", { method: "POST" });
    if (response.ok) {
      router.push("/login");
    }
  };

  return (
    <div className="relative">
      {/* Ícone do menu */}
      <Menu
        className="absolute left-1 top-1 cursor-pointer text-white hover:bg-[rgba(255,255,255,0.2)] duration-300 rounded-md"
        size={40}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      />

      {/* Mini menu abaixo do ícone */}
      {menuIsOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute left-1 top-10 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 border border-gray-200 z-50"
        >
          <ul className="divide-y divide-gray-200">
            <li
              className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 text-gray-700" />
              <p className="text-gray-800 font-medium">Sair</p>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
}
