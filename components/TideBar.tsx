"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/lib/site";

type Data = {
  tide: number;
  trend: "Rising" | "Falling";
  nextType: "High" | "Low";
  nextTime: string;
  wave: number;
  period: number;
  temp: number;
  tideSeries: number[];
  waveSeries: number[];
  hours: string[];
  nowIdx: number;
};

function fmtTime(iso: string) {
  const [h, m] = iso.slice(11, 16).split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ampm}`;
}

// Catmull-Rom -> cubic bezier for a smooth curve through the points.
function smoothPath(pts: [number, number][]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

function points(values: number[], w: number, h: number, pad: number): [number, number][] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = w / (values.length - 1);
  return values.map((v, i) => [i * stepX, h - pad - ((v - min) / range) * (h - pad * 2)]);
}

function TideGraph({ data }: { data: Data }) {
  const W = 248, H = 70, PAD = 10;
  const pts = useMemo(() => points(data.tideSeries, W, H, PAD), [data.tideSeries]);
  const line = smoothPath(pts);
  const area = `${line} L${W},${H} L0,${H} Z`;
  const cur = pts[Math.min(pts.length - 1, Math.max(0, data.nowIdx))];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-[70px] w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="tideFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2BA8E0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#2BA8E0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#tideFill)" />
      <path d={line} fill="none" stroke="#2BA8E0" strokeWidth={2} strokeLinecap="round" />
      {/* current time marker */}
      <line x1={cur[0]} y1={0} x2={cur[0]} y2={H} stroke="#F5C242" strokeWidth={1} strokeDasharray="2 3" opacity={0.6} />
      <circle cx={cur[0]} cy={cur[1]} r={3.5} fill="#F5C242" stroke="#0B3A5B" strokeWidth={1.5} />
    </svg>
  );
}

function WaveSpark({ values }: { values: number[] }) {
  const W = 60, H = 22, PAD = 3;
  const pts = points(values, W, H, PAD);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-5 w-16" preserveAspectRatio="none">
      <path d={smoothPath(pts)} fill="none" stroke="#3DBE8B" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

export default function TideBar() {
  const [d, setD] = useState<Data | null>(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(false);

  // Collapse by default on small screens.
  useEffect(() => {
    if (window.innerWidth < 640) setOpen(false);
  }, []);

  // Appear once the user scrolls past the hero.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const url =
      `https://marine-api.open-meteo.com/v1/marine?latitude=${SITE.lat}&longitude=${SITE.lng}` +
      `&current=sea_level_height_msl,wave_height,wave_period,sea_surface_temperature` +
      `&hourly=sea_level_height_msl,wave_height&forecast_days=2&timezone=auto`;
    fetch(url)
      .then((r) => r.json())
      .then((res) => {
        const cur = res.current;
        const times: string[] = res.hourly.time;
        const lvl: number[] = res.hourly.sea_level_height_msl;
        const wav: number[] = res.hourly.wave_height;

        let idx = times.findIndex((t) => t.slice(0, 13) === cur.time.slice(0, 13));
        if (idx < 0) idx = times.findIndex((t) => t >= cur.time);
        if (idx < 1) idx = 1;

        // Trend = where the tide is heading: compare the NEXT hour to now.
        const future = lvl[idx + 1] ?? lvl[idx];
        const trend: Data["trend"] = future >= cur.sea_level_height_msl ? "Rising" : "Falling";

        let nextType: Data["nextType"] = trend === "Rising" ? "High" : "Low";
        let nextTime = "";
        for (let i = idx; i < lvl.length - 1; i++) {
          const a = lvl[i] - lvl[i - 1];
          const b = lvl[i + 1] - lvl[i];
          if (a >= 0 && b < 0) { nextType = "High"; nextTime = times[i]; break; }
          if (a <= 0 && b > 0) { nextType = "Low"; nextTime = times[i]; break; }
        }

        setD({
          tide: cur.sea_level_height_msl,
          trend,
          nextType,
          nextTime: nextTime ? fmtTime(nextTime) : "—",
          wave: cur.wave_height,
          period: cur.wave_period,
          temp: cur.sea_surface_temperature,
          tideSeries: lvl.slice(0, 24),
          waveSeries: wav.slice(0, 24),
          hours: times.slice(0, 24),
          nowIdx: Math.min(23, idx),
        });
      })
      .catch(() => setFailed(true));
  }, []);

  if (failed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 z-40 w-[19rem] max-w-[calc(100vw-2rem)]"
        >
          <div className="overflow-hidden rounded-2xl bg-navy/95 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
            {/* Header (click to toggle) */}
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              aria-expanded={open}
            >
              <span className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  Weligama · Live
                </span>
              </span>
              <span className="flex items-center gap-3">
                {!open && d && <span className="font-display text-lg leading-none">{d.wave.toFixed(1)}m</span>}
                <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform ${open ? "" : "rotate-180"}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
                    {d ? (
                      <>
                        {/* Tide curve */}
                        <div className="rounded-xl bg-white/[0.04] p-3">
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">Tide</p>
                              <p className="font-display text-3xl leading-none">{d.tide.toFixed(2)} m</p>
                            </div>
                            <p className="text-right text-[11px] text-white/60">
                              {d.trend}
                              <br />
                              {d.nextType} {d.nextTime}
                            </p>
                          </div>
                          <div className="mt-1">
                            <TideGraph data={d} />
                          </div>
                          <div className="flex justify-between text-[9px] uppercase tracking-wider text-white/35">
                            <span>12 AM</span>
                            <span>12 PM</span>
                            <span>12 AM</span>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <div className="rounded-xl bg-white/[0.04] p-3">
                            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/50">Waves</p>
                            <p className="font-display text-xl leading-none">{d.wave.toFixed(1)}m</p>
                            <div className="mt-1.5"><WaveSpark values={d.waveSeries} /></div>
                          </div>
                          <div className="rounded-xl bg-white/[0.04] p-3">
                            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/50">Period</p>
                            <p className="font-display text-xl leading-none">{Math.round(d.period)}s</p>
                            <p className="mt-1.5 text-[10px] text-white/45">sets</p>
                          </div>
                          <div className="rounded-xl bg-white/[0.04] p-3">
                            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/50">Water</p>
                            <p className="font-display text-xl leading-none">{Math.round(d.temp)}°</p>
                            <p className="mt-1.5 text-[10px] text-white/45">{Math.round(d.temp)}°C</p>
                          </div>
                        </div>
                        <p className="mt-2.5 text-center text-[9px] uppercase tracking-[0.18em] text-white/30">
                          Live · Open-Meteo Marine
                        </p>
                      </>
                    ) : (
                      <div className="space-y-3 py-2">
                        <div className="h-20 animate-pulse rounded-xl bg-white/10" />
                        <div className="grid grid-cols-3 gap-2">
                          {[0, 1, 2].map((i) => (
                            <div key={i} className="h-16 animate-pulse rounded-xl bg-white/10" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
