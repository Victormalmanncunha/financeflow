"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function UserGreeting() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function pegarNome() {
      const response = await fetch("/api/user/name");
      const data = await response.json();
      setUserName(data.name);
    }
    pegarNome();
  }, []);

  return (
    <div className="h-10">
      {userName && (
        <motion.h1
          className="text-3xl text-white font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {`Olá ${userName.split(" ")[0]}!`}
        </motion.h1>
      )}
    </div>
  );
}
