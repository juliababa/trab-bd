import axios from "axios";

const backend_url = "http://127.0.0.1:8080";

export type UserType = {
  matricula: string;
  senha: string;
  nome: string;
  email: string;
  curso: string;
  cargo: string;
  imagem: File | null;
};

export type UserEditType = {
  senha: string;
  email: string;
  imagem: File | null;
};

export async function createUser(data: UserType) {
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      const imagem = reader.result;
      const payload = {
        ...data,
        imagem,
      };

      axios.post(backend_url + "/users", payload, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    false
  );

  if (data.imagem) {
    reader.readAsDataURL(data.imagem);
  }
}

export async function editUser(data: UserEditType, callback: () => void) {
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      const imagem = reader.result;
      const payload = {
        ...data,
        imagem,
      };

      axios
        .put(backend_url + "/users/me", payload, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then(callback);
    },
    false
  );

  if (data.imagem) {
    reader.readAsDataURL(data.imagem);
  }
}

export async function deleteUser(
  matricula: number,
  callback: (matricula: number) => void
) {
  const response = await axios
    .delete(backend_url + "/users", {
      params: { matricula },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(() => callback(matricula));

  return response;
}

export async function login(
  matricula: number,
  senha: string,
  callback: () => void
) {
  const response = await axios
    .post(backend_url + "/login", null, {
      params: { matricula, senha },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(callback);

  return response;
}

export async function get_user_info(callback: (data: any) => void) {
  axios
    .get(backend_url + "/users/me", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(({ data }) => callback(data))
    .catch((err) => console.log(err));
}
