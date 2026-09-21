import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, LogOut, Eye, EyeOff, TrendingUp } from "lucide-react";

const fmt = (n) => n.toLocaleString("es");

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl py-6 px-4 bg-white/5 border border-gold-400/20">
      <p className="text-3xl font-semibold text-gold-300">{fmt(value)}</p>
      <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
        {label}
      </p>
    </div>
  );
}

function AdminPage() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error || "Error al entrar");
        setPassword("");
        return;
      }
      setData(body);
    } finally {
      setBusy(false);
    }
  };

  const logout = () => {
    setData(null);
    setPassword("");
  };

  const max = data
    ? Math.max(1, ...data.series.map((d) => Math.max(d.visits, d.copies)))
    : 1;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl rounded-3xl p-8 sm:p-10 backdrop-blur-xl bg-white/5 border border-gold-400/20">
        {!data ? (
          <>
            <div className="flex items-center justify-center gap-3 mb-8">
              <Lock size={22} className="text-gold-400" aria-hidden="true" />
              <h1 className="font-serif text-3xl text-gold-300">
                Floristería · Panel
              </h1>
            </div>

            <form onSubmit={login} className="space-y-4">
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña de administrador"
                  autoComplete="current-password"
                  autoFocus
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-night/60 border border-gold-400/30 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-gold-400"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-gold-300 cursor-pointer"
                  aria-label="Mostrar contraseña"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <motion.button
                type="submit"
                disabled={busy || !password}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl font-semibold text-night bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 disabled:opacity-50 cursor-pointer"
              >
                {busy ? "Entrando…" : "Entrar al panel"}
              </motion.button>
            </form>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-sm text-red-300/90 text-center"
              >
                {error}
              </motion.p>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp size={22} className="text-gold-400" aria-hidden="true" />
                <h1 className="font-serif text-3xl text-gold-300">Métricas</h1>
              </div>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-gold-300 transition-colors cursor-pointer"
              >
                <LogOut size={16} aria-hidden="true" />
                Salir
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Stat label="Visitas · total" value={data.totals.visits} />
              <Stat label="Copias de enlace" value={data.totals.copies} />
              <Stat label="Visitas · hoy" value={data.series.at(-1).visits} />
              <Stat label="Copias · hoy" value={data.series.at(-1).copies} />
            </div>

            <div className="mt-10">
              <h2 className="text-sm uppercase tracking-widest text-slate-400 mb-4">
                Últimos 7 días
              </h2>
              <div className="flex items-end gap-2 h-40">
                {data.series.map((d) => (
                  <div
                    key={d.date}
                    className="flex-1 flex flex-col items-center gap-1"
                    title={`${d.date} · ${d.visits} visitas, ${d.copies} copias`}
                  >
                    <div className="w-full flex flex-col justify-end gap-1">
                      <div
                        className="w-full rounded-sm bg-gold-200/70 aria-hidden"
                        style={{ height: `${(d.visits / max) * 90}%`, maxHeight: 90 }}
                      />
                      <div
                        className="w-full rounded-sm bg-gold-600/60 aria-hidden"
                        style={{ height: `${(d.copies / max) * 90}%`, maxHeight: 90 }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {d.date.slice(5)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-center gap-6 text-xs text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-gold-300/70" /> Visitas
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-gold-600/60" /> Copias
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default AdminPage;