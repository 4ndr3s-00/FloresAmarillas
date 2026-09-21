async function upstash(method, ...p) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("KV no configurado");
  const res = await fetch(`${url}/${p.join("/")}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
  });
  if (!res.ok) throw new Error(`Upstash ${res.status}`);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export const incr = (k) => upstash("POST", "incr", k);
export const get = (k) => upstash("GET", "get", k);
export const expire = (k, seconds) => upstash("POST", "expire", k, String(seconds));
export const today = () => new Date().toISOString().slice(0, 10);

export const json = (res, status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });