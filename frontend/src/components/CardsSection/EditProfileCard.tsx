import TextInputComponent from "../TextInputComponent";
import DefaultButton from "../DefaultButton";
import PhotoInputComponent from "../PhotoInputComponent";
import { useState } from "react";
import { UserEditType, editUser } from "@/api/user";

type EditProfileCardType = {
  onSubmit: () => void;
};

const EditProfileCard = ({ onSubmit }: EditProfileCardType) => {
  const [state, setState] = useState<UserEditType>({
    senha: "",
    email: "",
    imagem: null,
  });

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

  function onSubmitHandler() {
    editUser(state, onSubmit);
  }

  return (
    <>
      <div className="flex bg-white text-black flex-col w-full h-full gap-[2%] rounded-3xl p-10">
        <h1 className="font-bold text-4xl">Editar Perfil</h1>
        <p className="font-light w-full">Atualize suas informações pessoais</p>
        <div className="flex flex-col w-full h-fit gap-2">
          <h2 className="font-normal text-2xl">Nova Foto de Perfil</h2>
          <PhotoInputComponent
            width="w-full"
            height="h-[50px]"
            border={false}
            label="Imagem"
            name="imagem"
            onChange={onChangeImage}
          />
        </div>
        <div className="flex flex-col w-full h-fit gap-2">
          <h2 className="font-normal text-2xl">Novo email</h2>
          <TextInputComponent
            width="w-full"
            height="h-[50px]"
            type="text"
            label="Email"
            name="email"
            value={state.email}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col w-full h-fit gap-2">
          <h2 className="font-normal text-2xl">Nova senha</h2>
          <TextInputComponent
            width="w-full"
            height="h-[50px]"
            type="password"
            label="Senha"
            name="senha"
            value={state.senha}
            onChange={onChange}
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
export default EditProfileCard;
