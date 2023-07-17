import axios from "axios";

const backend_url = "http://127.0.0.1:8080";

export async function reportEvaluation(
  cod: number,
  motivo: string,
  tipo: string,
  callback: () => void
) {
  const payload = {
    cod,
    motivo,
    tipo,
  };

  axios
    .post(backend_url + "/evaluations/report", payload, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(callback);
}

export async function listReports(callback: (data: any) => void) {
  axios
    .get(backend_url + "/reports", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(({ data }) => callback(data));
}

export async function ignore_evaluations(
  cod: number,
  tipo: string,
  matricula: number,
  callback: (cod: number, tipo: string, matricula: number) => void
) {
  const response = await axios
    .put(backend_url + "/reports/ignore", null, {
      params: { cod, tipo, matricula },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(() => callback(cod, tipo, matricula));
  return response;
}
