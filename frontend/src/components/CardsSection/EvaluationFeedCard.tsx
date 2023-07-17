import { useEffect, useState } from "react";
import CardEvaluation from "../CardEvaluation";
import { list_evaluations } from "@/api/evaluations";

type EvaluationFeedCardType = {
  onWarningClick: (cod_avaliacao: number, tipo: string) => void;
};

const EvaluationFeedCard = ({ onWarningClick }: EvaluationFeedCardType) => {
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    list_evaluations(setEvaluations);
  }, [setEvaluations]);

  return (
    <>
      <div className="flex bg-white text-black flex-col w-full h-full gap-[2%] rounded-3xl p-10">
        <h1 className="font-bold text-4xl">Avaliações Geral</h1>
        <p className="font-light w-full">Veja as avaliações dos seus colegas</p>
        <div className="flex flex-col w-full h-full gap-7 overflow-auto p-4">
          {evaluations.map(
            ({
              estudante,
              nome,
              cod,
              cod_avaliacao,
              comentario,
              tipo,
              imagem,
            }) => (
              <CardEvaluation
                nomeStudent={estudante}
                nome={nome}
                cod={cod}
                cod_avaliacao={cod_avaliacao}
                textComment={comentario}
                buttonTheme="warning"
                cargoTheme={false}
                tipo={tipo}
                onClicks={[onWarningClick]}
                userProfilePicture={imagem}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};
export default EvaluationFeedCard;
