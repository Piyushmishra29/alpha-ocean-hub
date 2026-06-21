"use client";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

type Conditions = {
  tide: number;
  trend: "Rising" | "Falling";
  nextType: "High" | "Low";
  nextTime: string;
  wave: number;
  period: number;
  temp: number;
};

function fmtTime(iso: string) {
  // iso like 2026-06-21T15:00 -> 3:00 PM
  const [h, m] = iso.slice(11, 16).split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 || 12;
  return `${hr}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function TideBar() {
  const [c, setC] = useState<Conditions | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const url =
      `https://marine-api.open-meteo.com/v1/marine?latitude=${SITE.lat}&longitude=${SITE.lng}` +
      `&current=sea_level_height_msl,wave_height,wave_period,sea_surface_temperature` +
      `&hourly=sea_level_height_msl&forecast_days=2&timezone=auto`;

    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        const cur = d.current;
        const times: string[] = d.hourly.time;
        const lvls: number[] = d.hourly.sea_level_height_msl;

        let idx = times.findIndex((t) => t >= cur.time);
        if (idx < 1) idx = 1;

        const trend: Conditions["trend"] =
          (lvls[idx] ?? cur.sea_level_height_msl) >= cur.sea_level_height_msl
            ? "Rising"
            : "Falling";

        // Find the next tidal turning point (high or low) after now.
        let nextType: Conditions["nextType"] = trend === "Rising" ? "High" : "Low";
        let nextTime = "";
        for (let i = idx; i < lvls.length - 1; i++) {
          const a = lvls[i] - lvls[i - 1];
          const b = lvls[i + 1] - lvls[i];
          if (a >= 0 && b < 0) {
            nextType = "High";
            nextTime = times[i];
            break;
          }
          if (a <= 0 && b > 0) {
            nextType = "Low";
            nextTime = times[i];
            break;
          }
        }

        setC({
          tide: cur.sea_level_height_msl,
          trend,
          nextType,
          nextTime: nextTime ? fmtTime(nextTime) : "—",
          wave: cur.wave_height,
          period: cur.wave_period,
          temp: cur.sea_surface_temperature,
        });
      })
      .catch(() => setFailed(true));
  }, []);

  if (failed) return null;

  const stats = c
    ? [
        {
          label: "Tide",
          value: `${c.tide.toFixed(2)} m`,
          sub: `${c.trend} · ${c.nextType} ${c.nextTime}`,
        },
        { label: "Waves", value: `${c.wave.toFixed(1)} m`, sub: "swell height" },
        { label: "Period", value: `${Math.round(c.period)} s`, sub: "between sets" },
        { label: "Water", value: `${Math.round(c.temp)}°C`, sub: "sea temp" },
      ]
    : null;

  return (
    <section aria-label="Live surf conditions" className="border-b border-white/10 bg-navy text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Weligama · Live Surf Report
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-5 sm:grid-cols-4">
          {(stats ?? [0, 1, 2, 3].map(() => null)).map((s, i) => (
            <div key={i} className="min-w-[5rem]">
              {s ? (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                    {s.label}
                  </p>
                  <p className="mt-1 font-display text-3xl leading-none">{s.value}</p>
                  <p className="mt-1 text-[11px] text-white/55">{s.sub}</p>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="h-2.5 w-12 animate-pulse rounded bg-white/15" />
                  <div className="h-6 w-16 animate-pulse rounded bg-white/15" />
                  <div className="h-2.5 w-14 animate-pulse rounded bg-white/10" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
