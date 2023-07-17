import axios from "axios";

const backend_url = "http://127.0.0.1:8080";

export async function list_teachers(callback: (data: any) => void) {
  const response = await axios
    .get(backend_url + "/teachers/me", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(({ data }) => callback(data));
}

export async function evaluate_teacher(
  cod: number,
  comentario: string,
  callback: () => void
) {
  const payload = {
    cod,
    comentario,
    tipo: "professor",
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
