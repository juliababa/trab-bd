import SelectComponent, { OptionType } from "../SelectComponent";
import CommentSection from "../CommentSection";
import DefaultButton from "../DefaultButton";
import { useEffect, useState } from "react";
import { evaluate_teacher, list_teachers } from "@/api/teacher";

type RateTeacherCardProps = {
  onSubmit: () => void;
};

type TeacherType = {
  cod: number;
  professor: string;
};

function formatTeachers(teachers: Array<TeacherType>) {
  return teachers.map(({ cod, professor }) => ({
    name: professor,
    value: cod,
  }));
}

const RateTeacherCard = ({ onSubmit }: RateTeacherCardProps) => {
  const [teachers, setTeachers] = useState<Array<OptionType>>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");

  const [comment, setComment] = useState<string>("");

  function onSubmitHandler() {
    evaluate_teacher(parseInt(selectedTeacher), comment, onSubmit);
  }

  useEffect(() => {
    list_teachers((teachers: any) => {
      const formattedOptions = formatTeachers(teachers);
      setTeachers(formattedOptions);
    });
  }, [setTeachers]);

  return (
    <>
      <div className="flex bg-white text-black flex-col w-full h-full gap-[2%] rounded-3xl p-10">
        <h1 className="font-bold text-4xl">Avaliação Professor</h1>
        <p className="font-light w-full">Queremos saber sua opnião !</p>
        <div className="flex flex-col w-full h-fit gap-2">
          <h2 className="font-normal text-2xl">Escolha um professor</h2>
          <SelectComponent
            width="w-full"
            height="h-[50px]"
            label="Professores"
            name="professores"
            options={teachers}
            value={selectedTeacher}
            onChange={({ target }) => setSelectedTeacher(target.value)}
          />
        </div>
        <div className="w-full h-fit">
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
export default RateTeacherCard;
