import UserPicture from "./UserPicture";
import DefaultButton from "./DefaultButton";
type CardEvaluationType = {
  nomeStudent: string;
  nome: string;
  textComment: string;
  cod: number;
  cod_avaliacao: number;
  buttonTheme: string;
  cargoTheme: boolean;
  textReason?: string;
  tipo: string;
  onClicks: Array<(...args: any[]) => void>;
  userProfilePicture: string;
  matricula?: number;
  cod_denuncia?: number;
};

const CardEvaluation = ({
  nomeStudent,
  nome,
  textComment,
  cod,
  cod_avaliacao,
  buttonTheme,
  cargoTheme,
  textReason,
  onClicks,
  userProfilePicture,
  tipo,
  matricula,
  cod_denuncia,
}: CardEvaluationType) => {
  const ButtonsVariants = {
    warning: (
      <button onClick={() => onClicks[0](cod_avaliacao, tipo)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7"
        >
          <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    ),
    options: (
      <div className="flex justify-between w-[45%] h-10">
        <DefaultButton
          width="w-[45%]"
          height="h-full"
          borderRadius="full"
          backgroundColor="blue"
          hoverColor="blue"
          label="Editar"
          action={() => onClicks[0](cod_avaliacao, tipo, textComment)}
        />
        <DefaultButton
          width="w-[45%]"
          height="h-full"
          borderRadius="full"
          backgroundColor="red"
          hoverColor="red"
          label="Apagar"
          action={() => onClicks[1](cod_avaliacao, tipo)}
        />
      </div>
    ),
  };
  return (
    <>
      <div className="flex bg-white text-black w-full h-fit rounded-3xl py-6 px-6 shadow-xl border-2 border-slate-100">
        <div className="flex flex-col items-center w-[20%] gap-2 justify-center">
          <UserPicture
            sizeTheme="small"
            userProfilePicture={userProfilePicture}
          />
          <p className="font-light text-base">{nomeStudent}</p>
        </div>
        <div className="flex flex-col w-[80%] gap-3">
          <div className="flex justify-between">
            <h2 className="w-[50%] font-normal text-xl">
              {nome} - {cod}
            </h2>
            {ButtonsVariants[buttonTheme as keyof typeof ButtonsVariants]}
          </div>

          <p className="font-light text-sm">{textComment}</p>
          {cargoTheme ? (
            <>
              <p className="font-light text-md text-red-600">{textReason}</p>
              <div className="flex justify-between">
                <DefaultButton
                  width="w-[25%]"
                  height="h-[40px]"
                  borderRadius="xl"
                  backgroundColor="blue"
                  hoverColor="blue"
                  label="Apagar Usuário"
                  action={() => onClicks[0](matricula)}
                />
                <DefaultButton
                  width="w-[25%]"
                  height="h-[40px]"
                  borderRadius="xl"
                  backgroundColor="blue"
                  hoverColor="blue"
                  label="Apagar Comentário"
                  action={() => onClicks[1](cod_avaliacao, tipo)}
                />
                <DefaultButton
                  width="w-[25%]"
                  height="h-[40px]"
                  borderRadius="xl"
                  backgroundColor="blue"
                  hoverColor="blue"
                  label="Ignorar"
                  action={() => onClicks[2](cod_denuncia, tipo, matricula)}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default CardEvaluation;
