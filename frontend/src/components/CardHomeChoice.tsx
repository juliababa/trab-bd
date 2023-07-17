import DefaultButton from "./DefaultButton";
import RateTeacherCard from "@/components/CardsSection/RateTeacherCard";
import RateClassCard from "@/components/CardsSection/RateClassCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

type CardHomeChoiceType = {
  title: string;
  subtitle: string;
  onClick: () => void;
};

const CardHomeChoice = ({ title, subtitle, onClick }: CardHomeChoiceType) => {
  return (
    <>
      <div className="flex bg-white text-black flex-col w-[45%] h-full gap-[3%] rounded-3xl py-4 px-6 shadow-xl border-2 border-slate-100">
        <div className="h-[65%] w-[80%]">
          <h1 className="font-medium text-xl">{title}</h1>
          <p className="font-light text-sm">{subtitle}</p>
        </div>
        <div className="w-5/12 h-12">
          <DefaultButton
            width="w-full"
            height="h-full"
            borderRadius="full"
            backgroundColor="blue"
            hoverColor="blue"
            label="Começar"
            action={onClick}
          />
        </div>
      </div>
    </>
  );
};
export default CardHomeChoice;
