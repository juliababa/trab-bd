import { useState } from "react";
import CommentSection from "../CommentSection";
import DefaultButton from "../DefaultButton";
import { edit_evaluation } from "@/api/evaluations";

type EditEvaluationCardType = {
  codAvaliacao: number;
  tipo: string;
  onSubmit: () => void;
  defaultComment: string;
};

const EditEvaluationCard = ({
  codAvaliacao,
  tipo,
  onSubmit,
  defaultComment,
}: EditEvaluationCardType) => {
  const [comment, setComment] = useState(defaultComment);
  function onSubmitHandler() {
    edit_evaluation(codAvaliacao, comment, tipo, onSubmit);
  }

  return (
    <>
      <div className="flex bg-white text-black flex-col w-full h-full gap-[2%] rounded-3xl p-10">
        <h1 className="font-bold text-4xl">Editar avaliação</h1>
        <p className="font-light w-full">
          Atualize o comentário da sua avaliação
        </p>
        <div className="flex flex-col w-fit h-fit gap-2">
          <h2 className="font-normal text-2xl">Comentário</h2>
          <CommentSection
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <div className="flex justify-end items-end h-full w-full">
          <DefaultButton
            width="w-[120px]"
            height="h-[50px]"
            borderRadius="xl"
            backgroundColor="blue"
            hoverColor="blue"
            label="Enviar"
            action={onSubmitHandler}
          />
        </div>
      </div>
    </>
  );
};
export default EditEvaluationCard;
