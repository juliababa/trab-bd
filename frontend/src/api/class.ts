import axios from "axios";

const backend_url = "http://127.0.0.1:8080";

export async function list_classes(callback: (data: any) => void) {
  const response = await axios
    .get(backend_url + "/classes/me", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(({ data }) => callback(data));

  return response;
}

export async function evaluate_class(
  cod: number,
  comentario: string,
  callback: (data: any) => void
) {
  const payload = {
    cod,
    comentario,
    tipo: "turma",
  };
  const response = await axios
    .post(backend_url + "/evaluate", payload, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(callback);
  return response;
}
