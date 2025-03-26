"use client";

import { useEffect, useState } from "react";

export default function CurrentBalance() {
  const [userBalance, setUserBalance] = useState(0);
  const [displayBalance, setDisplayBalance] = useState(0);
  async function getBalance() {
    try {
      const response = await fetch("http://localhost:3000/api/user/balance", {
        method: "GET",
      });
      const data = await response.json();
      setUserBalance(data.userBalance);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBalance();
  }, []);

  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();

    function easeOutQuad(t: number) {
      return t * (2 - t);
    }

    function updateBalance(currentTime: number) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // De 0 a 1
      const easedProgress = easeOutQuad(progress);

      const animatedValue = easedProgress * userBalance;

      setDisplayBalance(animatedValue);

      if (progress < 1) {
        requestAnimationFrame(updateBalance);
      }
    }

    requestAnimationFrame(updateBalance);
  }, [userBalance]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm flex flex-col items-center">
      <h2 className="text-xl font-semibold">Saldo atual</h2>
      <p className="text-2xl font-bold text-green-600">
        R${displayBalance.toFixed(2)}
      </p>
    </div>
  );
}
