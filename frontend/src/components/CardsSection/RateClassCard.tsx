import SelectComponent, { OptionType } from "../SelectComponent";
import CommentSection from "../CommentSection";
import DefaultButton from "../DefaultButton";
import { useEffect, useState } from "react";
import { evaluate_class, list_classes } from "@/api/class";

type RateClassCardProps = {
  onSubmit: () => void;
};

type ClassType = {
  turma: number;
  materia: string;
  professor: string;
};

function formatClasses(classes: Array<ClassType>) {
  return classes.map(({ turma, materia }) => ({
    name: materia,
    value: turma,
  }));
}

const RateClassCard = ({ onSubmit }: RateClassCardProps) => {
  const [classes, setClasses] = useState<Array<OptionType>>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");

  const [comment, setComment] = useState<string>("");

  function onSubmitHandler() {
    evaluate_class(parseInt(selectedClass), comment, onSubmit);
  }

  useEffect(() => {
    list_classes((classes: any) => {
      const formattedOptions = formatClasses(classes);
      setClasses(formattedOptions);
    });
  }, [setClasses]);

  return (
    <>
      <div className="flex bg-white text-black flex-col w-full h-full gap-[2%] rounded-3xl p-10">
        <h1 className="font-bold text-4xl">Avaliação Turma</h1>
        <p className="font-light w-full">Queremos saber sua opnião !</p>
        <div className="flex flex-col w-full h-fit gap-2">
          <h2 className="font-normal text-2xl">Escolha uma turma</h2>
          <SelectComponent
            width="w-full"
            height="h-[50px]"
            name="turmas"
            label="Turmas"
            value={selectedClass}
            options={classes}
            onChange={({ target }) => setSelectedClass(target.value)}
          />
        </div>
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
export default RateClassCard;
