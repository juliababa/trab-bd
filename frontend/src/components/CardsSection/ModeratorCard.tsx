import { useEffect, useState } from "react";
import CardEvaluation from "../CardEvaluation";
import DefaultButton from "../DefaultButton";
import { ignore_evaluations, listReports } from "@/api/report";
import { deleteUser } from "@/api/user";
import { delete_evaluations } from "@/api/evaluations";
type ModeratorCardObjectType = {
  estudante: string;
  nome: string;
  cod: number;
  comentario: string;
  tipo: string;
  motivo: string;
};

const ModeratorCard = () => {
  const [reports, setReports] = useState<Array<any>>([]);

  function EraseComment(av_cod: number, tipo: string) {
    delete_evaluations(av_cod, tipo, removeEvaluation);
  }

  function EraseUser(matricula: number) {
    deleteUser(matricula, removeUser);
  }

  function Ignore(cod_denuncia: number, tipo: string, matricula: number) {
    ignore_evaluations(cod_denuncia, tipo, matricula, removeReport);
  }

  function removeEvaluation(cod: number, tipo: string) {
    const newReports = reports.filter(
      (report) => !(report.cod === cod && report.tipo === tipo)
    );
    setReports(newReports);
  }

  function removeUser(matricula: number) {
    const newReports = reports.filter(
      (report) => report.matricula !== matricula
    );
    setReports(newReports);
  }

  function removeReport(cod_denuncia: number, tipo: string, matricula: number) {
    const newReports = reports.filter(
      (report) =>
        !(
          report.cod_denuncia === cod_denuncia &&
          report.tipo === tipo &&
          report.matricula === matricula
        )
    );
    setReports(newReports);
  }

  useEffect(() => {
    listReports(setReports);
  }, [setReports]);

  return (
    <>
      <div className="flex bg-white text-black flex-col w-full h-full gap-[2%] rounded-3xl p-10">
        <h1 className="font-bold text-4xl">Denúncias</h1>
        <p className="font-light w-full">
          Aqui você pode moderar os comentários denunciados
        </p>
        <div className="flex flex-col w-full h-full gap-7 overflow-auto p-4">
          {reports.map(
            ({
              estudante,
              nome,
              cod,
              comentario,
              tipo,
              motivo,
              imagem,
              matricula,
              cod_denuncia,
            }) => (
              <CardEvaluation
                userProfilePicture={imagem}
                nomeStudent={estudante}
                nome={nome}
                cod={cod}
                cod_avaliacao={cod}
                cod_denuncia={cod_denuncia}
                textComment={comentario}
                buttonTheme=""
                textReason={motivo}
                cargoTheme={true}
                tipo={tipo}
                matricula={matricula}
                onClicks={[EraseUser, EraseComment, Ignore]}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};
export default ModeratorCard;
