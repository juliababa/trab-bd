import TextInputComponent from "../TextInputComponent";
import DefaultButton from "../DefaultButton";
import { login } from "@/api/user";

import { useState } from "react";

type LoginCardType = {
  onButtonClick: Array<() => void>;
};
const LoginCard = ({ onButtonClick }: LoginCardType) => {
  const [state, setState] = useState({
    matricula: "",
    senha: "",
  });

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  }

  async function onSubmit() {
    const { matricula, senha } = state;
    login(parseInt(matricula), senha, onButtonClick[1]);
  }

  return (
    <div className="flex flex-col w-4/12 h-4/6">
      <div className="flex bg-white flex-col w-full h-full justify-center gap-[5%] items-center rounded-3xl">
        <div className="flex gap-4 justify-center items-center pb-8">
          <div className="w-32 h-fit">
            <img src="logo.png" alt="Unb Logo" />
          </div>
          <p className="w-fit font-medium text-lg">Universidade de Brasília</p>
        </div>

        <TextInputComponent
          width="w-8/12"
          height="h-[10%]"
          type="text"
          label="Matrícula"
          name="matricula"
          value={state.matricula}
          onChange={onChange}
        />
        <TextInputComponent
          width="w-8/12"
          height="h-[10%]"
          type="password"
          label="Senha"
          name="senha"
          value={state.senha}
          onChange={onChange}
        />
        <div className="flex w-full h-[10%] mt-4 justify-center gap-8">
          <div className="w-3/12 h-full">
            <DefaultButton
              width="w-full"
              height="h-full"
              borderRadius="xl"
              backgroundColor="blue"
              hoverColor="blue"
              label="Entrar"
              action={onSubmit}
            />
          </div>

          <div className="w-3/12 h-full">
            <DefaultButton
              width="w-full"
              height="h-full"
              borderRadius="xl"
              backgroundColor="blue"
              hoverColor="blue"
              label="Cadastre-se"
              action={onButtonClick[0]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginCard;
