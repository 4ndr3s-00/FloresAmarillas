import { incr, today, json } from "./_lib.js";

export default async function handler(req) {
  if (req.method !== "POST") return json(req, 405, { error: "método no permitido" });

  let body;
  try {
    body = await req.json();
  } catch {
    return json(req, 400, { error: "cuerpo inválido" });
  }

  const types = { visit: "visit", copy: "copy" };
  const type = types[body?.type];
  if (!type) return json(req, 400, { error: "tipo inválido" });

  const day = today();
  try {
    await Promise.all([incr(`${type}:total`), incr(`${type}:${day}`)]);
  } catch {
    return json(req, 500, { error: "KV no configurado" });
  }
  return json(req, 204, {});
}