"use client";
import { useRouter } from "next/navigation";
import UserPicture from "@/components/UserPicture";
import InivisibelButton from "@/components/InvisibleButton";
import HomeCard from "@/components/CardsSection/HomeCard";
import EditProfileCard from "@/components/CardsSection/EditProfileCard";
import EditEvaluationCard from "@/components/CardsSection/EditEvaluationCard";
import EvaluationFeedCard from "@/components/CardsSection/EvaluationFeedCard";
import EvaluationEditCard from "@/components/CardsSection/EvaluationEditCard";
import ModeratorCard from "@/components/CardsSection/ModeratorCard";
import ReasonCard from "@/components/CardsSection/ReasonCard";
import { useEffect, useState } from "react";
import RateTeacherCard from "@/components/CardsSection/RateTeacherCard";
import RateClassCard from "@/components/CardsSection/RateClassCard";
import { get_user_info } from "@/api/user";
export default function PanelPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [user, setUser] = useState<any>({});

  const [codAvaliacao, setCodAvaliacao] = useState(-1);
  const [tipoAvaliacao, setTipoAvaliacao] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    get_user_info(setUser);
  }, [setUser]);

  function refreshData() {
    get_user_info(setUser);
  }

  function redirectTeacherEvaluation() {
    setCurrentPage(5);
  }

  function redirectClassEvaluation() {
    setCurrentPage(6);
  }

  function redirectReasonEvaluation(newCodAvaliacao: number, tipo: string) {
    setCodAvaliacao(newCodAvaliacao);
    setTipoAvaliacao(tipo);
    setCurrentPage(7);
  }

  function redirectEditEvaluation(
    newCodAvaliacao: number,
    tipo: string,
    comment: string
  ) {
    setCodAvaliacao(newCodAvaliacao);
    setTipoAvaliacao(tipo);
    setComment(comment);
    setCurrentPage(8);
  }

  function redirectFeed() {
    setCurrentPage(1);
  }

  function redirectEvaluationEdit() {
    setCurrentPage(2);
  }

  function redirectHome() {
    setCurrentPage(0);
    refreshData();
  }

  const router = useRouter();
  const pages = [
    <HomeCard
      onTeacherEvaluationClick={redirectTeacherEvaluation}
      onClassEvaluationClick={redirectClassEvaluation}
    />,
    <EvaluationFeedCard onWarningClick={redirectReasonEvaluation} />,
    <EvaluationEditCard onEditButtonClick={redirectEditEvaluation} />,
    <ModeratorCard />,
    <EditProfileCard onSubmit={redirectHome} />,
    <RateTeacherCard onSubmit={redirectHome} />,
    <RateClassCard onSubmit={redirectHome} />,
    <ReasonCard
      onSubmit={redirectFeed}
      codAvaliacao={codAvaliacao}
      tipo={tipoAvaliacao}
    />,
    <EditEvaluationCard
      onSubmit={redirectEvaluationEdit}
      codAvaliacao={codAvaliacao}
      tipo={tipoAvaliacao}
      defaultComment={comment}
    />,
  ];
  return (
    <div className="flex h-screen text-white">
      <div className="flex p-10 items-center justify-center w-4/12 h-full">
        <div className="flex flex-col justify-between w-11/12 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 justify-center items-center h-fit">
              <div className="w-24 h-fit">
                <img src="/logo.png" alt="Unb Logo" />
              </div>
              <p className="w-fit font-medium text-lg">
                Universidade de Brasília
              </p>
            </div>
            <div className="flex flex-col w-full items-center gap-4 mt-8">
              <UserPicture
                sizeTheme="big"
                userProfilePicture={user.imagem}
              ></UserPicture>
              <div className="flex flex-col items-center gap-2">
                <p className="w-fit font-medium text-3xl">{user.nome}</p>
                <p className="w-fit font-light text-lg">{user.matricula}</p>
              </div>
              <div className="border-b-2 w-full h-fit"></div>
            </div>
            <div className="flex flex-col h-fit w-full mt-2">
              <InivisibelButton
                label="Página Inicial"
                action={() => setCurrentPage(0)}
              />
              <InivisibelButton
                label="Visualizar Avaliações"
                action={() => setCurrentPage(1)}
              />
              <InivisibelButton
                label="Minhas Avaliações"
                action={() => setCurrentPage(2)}
              />
              {user.cargo === "Administrador" && (
                <InivisibelButton
                  label="Gerenciar Denúncias"
                  action={() => setCurrentPage(3)}
                />
              )}
              <InivisibelButton
                label="Editar Perfil"
                action={() => setCurrentPage(4)}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div className="flex flex-row w-fit h-fit mt-4 gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              <InivisibelButton label="Sair" action={() => router.push("/")} />
            </div>
            <div className="flex flex-col w-fit h-fit ">
              <p>Bancos de Dados - 01/2023</p>
              <p>Júlia Yuri Garcia Baba</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-8/12 h-full p-8">
        {/* <ModeratorCard
          evaluations={[
            {
              estudante: "Julia Baba",
              nome: "Banco de Dados",
              cod: 1289,
              comentario:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec lorem aliquet, posuere eros sed, ultrices metus. In auctor consequat leo, id ultrices risus cursus at. Proin non nisi et enim tincidunt feugiat. Nunc sed ullamcorper nisi, eu consectetur nisi. Vivamus sed libero felis. Curabitur at sollicitudin urna, in scelerisque metus.",
              tipo: "Aluno",
              motivo: "Comentário Ofensivo",
            },
            {
              estudante: "Julia Baba",
              nome: "Banco de Dados",
              cod: 1289,
              comentario:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec lorem aliquet, posuere eros sed, ultrices metus. In auctor consequat leo, id ultrices risus cursus at. Proin non nisi et enim tincidunt feugiat. Nunc sed ullamcorper nisi, eu consectetur nisi. Vivamus sed libero felis. Curabitur at sollicitudin urna, in scelerisque metus.",
              tipo: "Aluno",
              motivo: "Comentário Ofensivo",
            },
            {
              estudante: "Julia Baba",
              nome: "Banco de Dados",
              cod: 1289,
              comentario:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec lorem aliquet, posuere eros sed, ultrices metus. In auctor consequat leo, id ultrices risus cursus at. Proin non nisi et enim tincidunt feugiat. Nunc sed ullamcorper nisi, eu consectetur nisi. Vivamus sed libero felis. Curabitur at sollicitudin urna, in scelerisque metus.",
              tipo: "Aluno",
              motivo: "Comentário Ofensivo",
            },
          ]}
        /> */}
        {pages[currentPage]}
      </div>
    </div>
  );
}
