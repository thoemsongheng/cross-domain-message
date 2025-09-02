"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.addEventListener("message", (event) => {
      const message = event.data;
      window.localStorage.setItem("token", message);
    });
  }, []);

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <h1 className="text-2xl">Receiver Domain</h1>
    </main>
  );
}
