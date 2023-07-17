import { useEffect, useState } from "react";
import CardEvaluation from "../CardEvaluation";
import { delete_evaluations, user_list_evaluations } from "@/api/evaluations";

type EvaluationEditCardType = {
  onEditButtonClick: (codigo: number, tipo: string, comment: string) => void;
};

type EvaluationType = {
  cod: number;
  nome: string;
  estudante: string;
  imagem: string;
  comentario: string;
  cod_avaliacao: number;
  tipo: string;
};

const EvaluationEditCard = ({ onEditButtonClick }: EvaluationEditCardType) => {
  const [evaluations, setEvaluations] = useState<Array<EvaluationType>>([]);

  function onDeleteButtonClick(cod: number, tipo: string) {
    delete_evaluations(cod, tipo, removeEvaluation);
  }

  function removeEvaluation(cod_avaliacao: number, tipo: string) {
    const newEvaluations = evaluations.filter(
      (evaluation) =>
        !(
          evaluation.cod_avaliacao === cod_avaliacao && evaluation.tipo === tipo
        )
    );

    setEvaluations(newEvaluations);
  }

  useEffect(() => {
    user_list_evaluations(setEvaluations);
  }, [setEvaluations]);

  return (
    <>
      <div className="flex bg-white text-black flex-col w-full h-full gap-[2%] rounded-3xl p-10">
        <h1 className="font-bold text-4xl">Minhas Avaliações</h1>
        <p className="font-light w-full">
          Atualize o comentário da sua avaliação
        </p>
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
                buttonTheme="options"
                cargoTheme={false}
                tipo={tipo}
                onClicks={[onEditButtonClick, onDeleteButtonClick]}
                userProfilePicture={imagem}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};
export default EvaluationEditCard;
