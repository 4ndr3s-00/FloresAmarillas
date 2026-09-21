import { timingSafeEqual } from "node:crypto";
import { get, incr, expire, today, json } from "./_lib.js";

const verify = (a, b) => {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
};

export default async function handler(req) {
  if (req.method !== "OPTIONS") {
    const allowed = ["POST", "OPTIONS"];
    if (!allowed.includes(req.method))
      return json(req, 405, { error: "método no permitido" });
  }
  if (req.method === "OPTIONS") return new Response(null, { status: 204 });

  let body;
  try {
    body = await req.json();
  } catch {
    return json(req, 400, { error: "cuerpo inválido" });
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return json(req, 500, { error: "ADMIN_PASSWORD no configurado" });

  try {
    const attempts = Number(await get("admin:brute")) || 0;
    if (attempts >= 10) return json(req, 429, { error: "demasiados intentos, espera 5 min" });

    if (!verify(body?.password, expected)) {
      await incr("admin:brute");
      await expire("admin:brute", 300);
      return json(req, 401, { error: "contraseña incorrecta" });
    }

    await expire("admin:brute", 1);

    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().slice(0, 10);
    });

    const [visitsTotal, copiesTotal, ...daily] = await Promise.all([
      get("visit:total"),
      get("copy:total"),
      ...days.flatMap((d) => [get(`visit:${d}`), get(`copy:${d}`)]),
    ]);

    const series = days.map((date, i) => ({
      date,
      visits: Number(daily[i * 2]) || 0,
      copies: Number(daily[i * 2 + 1]) || 0,
    }));

    return json(req, 200, {
      today: today(),
      totals: { visits: Number(visitsTotal) || 0, copies: Number(copiesTotal) || 0 },
      series,
    });
  } catch {
    return json(req, 500, { error: "KV no configurado" });
  }
}