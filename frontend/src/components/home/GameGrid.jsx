"use client";
import { useState } from "react";
import Link from "next/link";
import { Lock, Bell, Gamepad2, Crosshair, Shield } from "lucide-react";

const games = [
  {
    id: "efootball",
    title: "eFootball™ Mobile",
    category: "FOOTBALL · 1V1",
    image: "/games/efootball.png",
    status: "LIVE",
    onlineCount: "1,248 online",
    prizePools: "50 Tk - 80 Tk",
    openChallenges: "86 challenges",
    href: "/matches",
    fallbackGradient:
      "radial-gradient(circle at 75% 30%, rgba(16, 185, 129, 0.28), transparent 55%), linear-gradient(135deg, #0b1914 0%, #090a09 100%)",
    FallbackIcon: Gamepad2,
  },
  {
    id: "freefire",
    title: "Free Fire Max",
    category: "BATTLE ROYALE · SQUAD",
    description:
      "Squad tournaments and custom rooms with automated result verification.",
    image: "/games/freefire.png",
    status: "COMING SOON",
    fallbackGradient:
      "radial-gradient(circle at 65% 25%, rgba(245, 158, 11, 0.16), transparent 55%), linear-gradient(135deg, #16120c 0%, #090a09 100%)",
    FallbackIcon: Crosshair,
  },
  {
    id: "pubg",
    title: "PUBG Mobile",
    category: "BATTLE ROYALE · TDM",
    description:
      "Squad tournaments and custom rooms with automated result verification.",
    image: "/games/pubg.png",
    status: "COMING SOON",
    fallbackGradient:
      "radial-gradient(circle at 70% 25%, rgba(161, 161, 170, 0.14), transparent 55%), linear-gradient(135deg, #121214 0%, #090a09 100%)",
    FallbackIcon: Shield,
  },
];

export default function GameGrid() {
  const [imgErrors, setImgErrors] = useState({});

  const handleImgError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Section Header */}
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Choose your arena
          </h2>
          <p className="mt-1 text-xs text-zinc-400">
            More titles are landing soon.
          </p>
        </div>
        <span className="text-[11px] font-semibold tracking-widest text-zinc-400 uppercase">
          3 GAMES
        </span>
      </div>

      {/* 3-Column Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => {
          const isLive = game.status === "LIVE";
          const hasImgError = Boolean(imgErrors[game.id]);
          const FallbackIcon = game.FallbackIcon;

          if (isLive) {
            return (
              <article
                key={game.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/90 bg-[#0c0e0d] hover:border-zinc-700 transition"
              >
                <div>
                  {/* Top Image + Badges */}
                  <div
                    className="relative h-48 w-full overflow-hidden bg-zinc-900"
                    style={
                      hasImgError ? { background: game.fallbackGradient } : undefined
                    }
                  >
                    {!hasImgError && (
                      <img
                        src={game.image}
                        alt={game.title}
                        loading="lazy"
                        onError={() => handleImgError(game.id)}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                    )}

                    {hasImgError && (
                      <div className="flex h-full w-full items-center justify-center opacity-20">
                        <FallbackIcon className="h-16 w-16 text-emerald-300" strokeWidth={1.25} />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e0d] via-transparent to-black/30" />

                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-950/85 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      LIVE
                    </span>

                    <span className="absolute top-3 right-3 rounded-full border border-zinc-700/80 bg-zinc-950/80 px-2.5 py-0.5 text-[10px] font-medium text-zinc-200">
                      {game.onlineCount}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <p className="text-[10px] font-semibold tracking-wider text-emerald-400 uppercase">
                      {game.category}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-white">
                      {game.title}
                    </h3>

                    {/* Prize Pools & Open 1v1s Boxes */}
                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      <div className="rounded-lg border border-zinc-800/90 bg-[#090a09] px-3 py-2.5">
                        <p className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase">
                          PRIZE POOLS
                        </p>
                        <p className="mt-1 text-xs font-bold text-white">
                          {game.prizePools}
                        </p>
                      </div>
                      <div className="rounded-lg border border-zinc-800/90 bg-[#090a09] px-3 py-2.5">
                        <p className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase">
                          OPEN 1V1S
                        </p>
                        <p className="mt-1 text-xs font-bold text-white">
                          {game.openChallenges}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Button */}
                    <Link
                      href={game.href}
                      className="mt-4 flex h-10 w-full items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-950/70 px-4 text-xs font-bold tracking-wider text-emerald-400 uppercase hover:bg-emerald-500 hover:text-zinc-950 transition"
                    >
                      <span>ENTER LOBBY</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          }

          return (
            <article
              key={game.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0c0e0d]"
            >
              <div>
                {/* Top Image + Coming Soon Badge */}
                <div
                  className="relative h-48 w-full overflow-hidden bg-zinc-900/90"
                  style={
                    hasImgError ? { background: game.fallbackGradient } : undefined
                  }
                >
                  {!hasImgError && (
                    <img
                      src={game.image}
                      alt={game.title}
                      loading="lazy"
                      onError={() => handleImgError(game.id)}
                      className="h-full w-full object-cover opacity-55 grayscale-[30%]"
                    />
                  )}

                  {hasImgError && (
                    <div className="flex h-full w-full items-center justify-center opacity-15">
                      <FallbackIcon className="h-16 w-16 text-zinc-300" strokeWidth={1.25} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e0d] via-[#0c0e0d]/30 to-black/30" />

                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-700/80 bg-zinc-900/90 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-zinc-300 uppercase">
                    <Lock className="h-2.5 w-2.5 text-zinc-400" />
                    COMING SOON
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col justify-between min-h-[196px]">
                  <div>
                    <p className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                      {game.category}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-white">
                      {game.title}
                    </h3>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      alert(`We'll notify you when ${game.title} launches!`)
                    }
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-[#090a09] py-2.5 text-xs font-medium text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 transition"
                  >
                    <Bell className="h-3.5 w-3.5 text-zinc-400" />
                    Get notified at launch
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}