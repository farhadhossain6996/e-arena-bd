"use client";
import { useState } from "react";
import { Swords, Plus, ShieldCheck } from "lucide-react";

export default function MatchesPage() {
  const [matches, setMatches] = useState([
    { id: 1, game: "eFootball Mobile", player: "RakibFC", stake: 50, status: "Waiting" },
    { id: 2, game: "eFootball Mobile", player: "DhakaKing", stake: 100, status: "Waiting" },
    { id: 3, game: "eFootball Mobile", player: "Tanvir07", stake: 200, status: "Waiting" },
  ]);

  const [stake, setStake] = useState(50);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleCreateMatch = (e) => {
    e.preventDefault();
    const newMatch = {
      id: matches.length + 1,
      game: "eFootball Mobile",
      player: "Player_A (You)",
      stake: Number(stake),
      status: "Waiting",
    };
    setMatches([newMatch, ...matches]);
    setIsOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header & Create Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">1v1 Match Lobby</h1>
          <p className="mt-1 text-sm text-slate-400">
            Challenge players or create your own room. Secured with 100% Escrow.
          </p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition"
        >
          <Plus className="h-4 w-4" />
          Create Challenge
        </button>
      </div>

      {/* Create Match Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Create 1v1 eFootball Match</h3>
            <form onSubmit={handleCreateMatch} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">
                  Select Entry Fee (Stake Amount in Tk)
                </label>
                <select
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value={50}>50 Tk Pool</option>
                  <option value={100}>100 Tk Pool</option>
                  <option value={200}>200 Tk Pool</option>
                  <option value={500}>500 Tk Pool</option>
                </select>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                <span>Escrow Protection: Stake amount will be locked securely until result verification.</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition"
                >
                  Publish Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Match Confirmation Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Join Match: {selectedMatch.game}</h3>
            <p className="text-xs text-slate-400 mb-4">
              Hosting Player: <span className="text-white font-bold">{selectedMatch.player}</span> | Stake: <span className="text-emerald-400 font-bold">{selectedMatch.stake} Tk</span>
            </p>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 mb-6 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>{selectedMatch.stake} Tk will be deducted from your wallet and locked in Escrow.</span>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedMatch(null)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Successfully joined match hosted by ${selectedMatch.player}!`);
                  setSelectedMatch(null);
                }}
                className="rounded-xl bg-emerald-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition"
              >
                Confirm & Lock Escrow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Matches List Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((m) => (
          <div
            key={m.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-5 hover:border-emerald-500/40 transition"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 text-xs font-semibold text-emerald-400">
                  {m.game}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                  {m.status}
                </span>
              </div>
              <div className="flex items-center gap-3 my-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 font-bold text-white text-sm">
                  {m.player.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-slate-400">Host Player</p>
                  <p className="text-sm font-bold text-white">{m.player}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Prize Pool</p>
                <p className="text-base font-extrabold text-emerald-400">{m.stake * 2} Tk</p>
              </div>
              <button
                onClick={() => setSelectedMatch(m)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 hover:text-slate-950 transition"
              >
                <Swords className="h-3.5 w-3.5" />
                Join Match
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}