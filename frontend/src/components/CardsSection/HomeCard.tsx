import { useEffect, useState } from "react";
import CardHomeChoice from "../CardHomeChoice";
import TableClasses from "../TableClasses";
import { list_classes } from "@/api/class";

type CardHomeType = {
  onTeacherEvaluationClick: () => void;
  onClassEvaluationClick: () => void;
};

const HomeCard = ({
  onTeacherEvaluationClick,
  onClassEvaluationClick,
}: CardHomeType) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    list_classes(setClasses);
  }, [setClasses]);

  return (
    <>
      <div className="flex bg-white text-black flex-col w-full h-full gap-[2%] rounded-3xl p-10">
        <h1 className="font-bold text-4xl">Sistema de Avaliações</h1>
        <p className="font-light w-full">
          Avalie professores e turmas e ajude a construir um ambiente de
          aprendizado excepcional
        </p>
        <div className="flex w-[full] h-[35%] justify-center">
          <div className="flex h-full w-9/12 justify-between">
            <CardHomeChoice
              title="Avaliar Professores"
              subtitle="Dê sua opnião sobre os professores da UnB!"
              onClick={onTeacherEvaluationClick}
            />
            <CardHomeChoice
              title="Avaliar Turmas"
              subtitle="Dê sua opnião sobre as turmas desse semestre!"
              onClick={onClassEvaluationClick}
            />
          </div>
        </div>
        <div className="h-[65%] w-full mt-8">
          <h2 className="font-medium text-3xl">Grade Curricular</h2>
          <TableClasses
            data={classes}
            // data={[
            //   {
            //     turma: "12345",
            //     materia: "Banco de Dados",
            //     professor: "Gustavo P Chaves",
            //   },
            //   {
            //     turma: "12345",
            //     materia: "Banco de Dados",
            //     professor: "Gustavo P Chaves",
            //   },
            //   {
            //     turma: "12345",
            //     materia: "Banco de Dados",
            //     professor: "Gustavo P Chaves",
            //   },
            //   {
            //     turma: "12345",
            //     materia: "Banco de Dados",
            //     professor: "Gustavo P Chaves",
            //   },
            // ]}
          />
        </div>
      </div>
    </>
  );
};
export default HomeCard;
