import axios from "axios";

const backend_url = "http://127.0.0.1:8080";

export async function list_evaluations(callback: (data: any) => void) {
  const response = await axios
    .get(backend_url + "/evaluations", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(({ data }) => callback(data));
  return response;
}

export async function user_list_evaluations(callback: (data: any) => void) {
  const response = await axios
    .get(backend_url + "/evaluations/me", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(({ data }) => callback(data));
  return response;
}

export async function delete_evaluations(
  cod: number,
  tipo: string,
  callback: (cod: number, tipo: string) => void
) {
  const response = await axios
    .delete(backend_url + "/evaluations", {
      params: { cod, tipo },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(() => callback(cod, tipo));
  return response;
}

export async function edit_evaluation(
  cod: number,
  comentario: string,
  tipo: string,
  callback: () => void
) {
  const payload = {
    cod,
    comentario,
    tipo,
  };

  const response = await axios
    .put(backend_url + "/evaluations/me", payload, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(callback);
  return response;
}
