"use client";
import LoginCard from "@/components/CardsSection/LoginCard";
import RegisterCard from "@/components/CardsSection/RegisterCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  function redirectRegister() {
    setCurrentPage(1);
  }
  const pages = [
    <LoginCard
      onButtonClick={[redirectRegister, () => router.push("/pages/PanelPage")]}
    />,
    <RegisterCard onEnterButtonClick={() => setCurrentPage(0)} />,
  ];
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {pages[currentPage]}
    </div>
  );
}
