import TextInputComponent from "../TextInputComponent";
import DefaultButton from "../DefaultButton";
import SelectComponent from "../SelectComponent";
import PhotoInputComponent from "../PhotoInputComponent";
import { useState } from "react";
import { createUser, UserType } from "@/api/user";

type RegisterCardType = {
  onEnterButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const RegisterCard = ({ onEnterButtonClick }: RegisterCardType) => {
  const [state, setState] = useState<UserType>({
    matricula: "",
    senha: "",
    nome: "",
    email: "",
    curso: "",
    cargo: "",
    imagem: null,
  });

  function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    createUser(state);
    onEnterButtonClick(event);
  }

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setState({ ...state, imagem: files[0] });
    }
  };

  function onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  }

  return (
    <div className="flex flex-col w-4/12 h-5/6">
      <div className="flex bg-white flex-col w-full h-full gap-[3%] items-center rounded-3xl py-8">
        <div className="flex gap-4 justify-center items-center pb-4">
          <div className="w-32 h-fit">
            <img src="logo.png" alt="Unb Logo" />
          </div>
          <p className="w-fit font-medium text-lg">Universidade de Brasília</p>
        </div>
        <div className="flex flex-col w-11/12 h-full justify-between">
          <TextInputComponent
            width="w-full"
            height="h-[10%]"
            type="number"
            label="Matrícula"
            name="matricula"
            value={state.matricula}
            onChange={onChange}
          />
          <TextInputComponent
            width="w-full"
            height="h-[10%]"
            type="password"
            name="senha"
            label="Senha"
            value={state.senha}
            onChange={onChange}
          />
          <TextInputComponent
            width="w-full"
            height="h-[10%]"
            type="text"
            label="Nome"
            name="nome"
            value={state.nome}
            onChange={onChange}
          />
          <TextInputComponent
            width="w-full"
            height="h-[10%]"
            type="email"
            label="Email"
            name="email"
            value={state.email}
            onChange={onChange}
          />
          <TextInputComponent
            width="w-full"
            height="h-[10%]"
            type="text"
            label="Curso"
            name="curso"
            value={state.curso}
            onChange={onChange}
          />
          <SelectComponent
            width="w-full"
            height="h-[10%]"
            label="Cargo"
            name="cargo"
            value={state.cargo}
            onChange={onChange}
            options={[
              { name: "Administrador", value: "Administrador" },
              { name: "Aluno", value: "Aluno" },
            ]}
          />
          <PhotoInputComponent
            width="w-full"
            height="h-[10%]"
            label="Escolha uma foto de perfil:"
            border={false}
            name="imagem"
            onChange={onChangeImage}
          />
        </div>

        <div className="flex w-full h-[11%] mt-2 justify-center gap-8">
          <div className="w-3/12 h-full">
            <DefaultButton
              width="w-full"
              height="h-full"
              borderRadius="xl"
              backgroundColor="blue"
              hoverColor="blue"
              label="Cadastrar"
              action={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterCard;
