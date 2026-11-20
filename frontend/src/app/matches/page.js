"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Swords,
  Users,
  Plus,
  ShieldCheck,
  UserPlus,
  Copy,
  Check,
  Trophy,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";

const INITIAL_MATCHES = [
  {
    id: 1,
    format: "1v1",
    groupSize: 1,
    teamName: "",
    type: "public",
    game: "eFootball™ Mobile",
    host: "RakibFC",
    targetPlayer: null,
    opponentFb: "",
    stake: 50,
    status: "Waiting",
    roomCode: "",
  },
  {
    id: 2,
    format: "group",
    groupSize: 2,
    teamName: "Dhaka Strikers",
    type: "public",
    game: "eFootball™ Mobile",
    host: "DhakaKing",
    targetPlayer: null,
    opponentFb: "",
    stake: 100,
    status: "Waiting (2v2)",
    roomCode: "",
  },
  {
    id: 3,
    format: "1v1",
    groupSize: 1,
    teamName: "",
    type: "direct",
    game: "eFootball™ Mobile",
    host: "Tanvir07",
    targetPlayer: "Player_A",
    opponentFb: "https://facebook.com/tanvir07.gg",
    stake: 200,
    status: "Challenge Sent",
    roomCode: "",
  },
];

const MATCH_RULES = [
  "10 min halves off",
  "Normal condition",
  "No extra time",
  "Screenshot proof",
];

export default function MatchesPage() {
  const [matches, setMatches] = useState(INITIAL_MATCHES);
  const [activeTab, setActiveTab] = useState("all"); // "all" | "1v1" | "group" | "active"

  // Create modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [matchFormat, setMatchFormat] = useState("1v1"); // "1v1" | "group"
  const [groupSize, setGroupSize] = useState(2); // 2, 3, 4
  const [teamName, setTeamName] = useState("");
  const [challengeMode, setChallengeMode] = useState("public"); // "public" | "direct"
  const [stake, setStake] = useState(50);
  const [targetUsername, setTargetUsername] = useState("");
  const [opponentFb, setOpponentFb] = useState("");

  // Join confirmation modal state
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Room / Result modal state
  const [activeRoomMatch, setActiveRoomMatch] = useState(null);
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  const getTotalPool = (m) => {
    const multiplier = m.format === "group" ? (m.groupSize || 2) * 2 : 2;
    return Number(m.stake) * multiplier;
  };

  const handleCreateChallenge = (e) => {
    e.preventDefault();

    const isGroup = matchFormat === "group";
    const size = isGroup ? Number(groupSize) : 1;
    const isDirect = challengeMode === "direct" && targetUsername.trim();

    const newMatch = {
      id: Date.now(),
      format: isGroup ? "group" : "1v1",
      groupSize: size,
      teamName: isGroup ? teamName.trim() || "Squad Alpha" : "",
      type: isDirect ? "direct" : "public",
      game: "eFootball™ Mobile",
      host: "Player_A (You)",
      targetPlayer: isDirect ? targetUsername.trim() : null,
      opponentFb: isDirect ? opponentFb.trim() : "",
      stake: Number(stake),
      status: isDirect
        ? "Challenge Sent"
        : isGroup
        ? `Waiting (${size}v${size})`
        : "Waiting",
      roomCode: "",
    };

    setMatches((prev) => [newMatch, ...prev]);
    setTargetUsername("");
    setOpponentFb("");
    setTeamName("");
    setChallengeMode("public");
    setMatchFormat("1v1");
    setIsCreateOpen(false);
  };

  const handleConfirmJoin = () => {
    if (!selectedMatch) return;

    const generatedRoom =
      selectedMatch.roomCode ||
      `EFB-${Math.floor(100000 + Math.random() * 900000)}`;

    setMatches((prev) =>
      prev.map((m) =>
        m.id === selectedMatch.id
          ? { ...m, status: "In Match", roomCode: generatedRoom }
          : m
      )
    );

    const updated = {
      ...selectedMatch,
      status: "In Match",
      roomCode: generatedRoom,
    };

    setSelectedMatch(null);
    setActiveRoomMatch(updated);
    setRoomCodeInput(generatedRoom);
  };

  const handleSaveRoomCode = (e) => {
    e.preventDefault();
    if (!activeRoomMatch || !roomCodeInput.trim()) return;

    const cleanCode = roomCodeInput.trim().toUpperCase();
    setMatches((prev) =>
      prev.map((m) =>
        m.id === activeRoomMatch.id ? { ...m, roomCode: cleanCode } : m
      )
    );
    setActiveRoomMatch((prev) => ({ ...prev, roomCode: cleanCode }));
  };

  const handleSettleDemo = (winnerLabel) => {
    if (!activeRoomMatch) return;

    setMatches((prev) =>
      prev.map((m) =>
        m.id === activeRoomMatch.id
          ? { ...m, status: `Settled (${winnerLabel} won)` }
          : m
      )
    );
    setActiveRoomMatch(null);
  };

  const copyRoom = (code) => {
    if (!code) return;
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1500);
  };

  const filteredMatches = matches.filter((m) => {
    if (activeTab === "1v1") return m.format === "1v1";
    if (activeTab === "group") return m.format === "group";
    if (activeTab === "active") {
      return m.status.startsWith("In Match") || m.status.startsWith("Settled");
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 bg-[#09090b] text-zinc-100">
      {/* Top Arena Banner (image_4b64e9.jpg style) */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-800/90 bg-[#070b0a] px-6 py-6 sm:px-8 sm:py-7">
        {/* Ambient emerald & stadium glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-60 w-80 rounded-full bg-emerald-500/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#070b0a] via-[#070b0a]/85 to-emerald-950/25"
        />

        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-emerald-400 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to hub</span>
          </Link>

          <p className="mt-3 text-[11px] font-bold tracking-[0.14em] text-emerald-400 uppercase">
            CHALLENGE LOBBY
          </p>

          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            eFootball<sup className="text-sm font-semibold ml-0.5">TM</sup> Mobile
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {MATCH_RULES.map((rule) => (
              <span
                key={rule}
                className="rounded-md border border-zinc-800 bg-zinc-950/85 px-2.5 py-1 text-[11px] font-medium text-zinc-300"
              >
                {rule}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-6 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Match Lobby
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Play 1v1 duels or Group vs Group battles. Funds stay locked in escrow until verified.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-950 hover:bg-emerald-400 transition"
        >
          <Plus className="h-4 w-4" />
          Create Challenge
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-medium border transition ${
            activeTab === "all"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
              : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white"
          }`}
        >
          All ({matches.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("1v1")}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium border transition ${
            activeTab === "1v1"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
              : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white"
          }`}
        >
          <Swords className="h-3.5 w-3.5" />
          1v1 ({matches.filter((m) => m.format === "1v1").length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("group")}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium border transition ${
            activeTab === "group"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
              : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white"
          }`}
        >
          <Users className="h-3.5 w-3.5" />
          Group vs Group ({matches.filter((m) => m.format === "group").length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("active")}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-medium border transition ${
            activeTab === "active"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
              : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white"
          }`}
        >
          Active & Settled
        </button>
      </div>

      {/* Create Challenge Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">
              Create eFootball Challenge
            </h3>

            <form onSubmit={handleCreateChallenge} className="space-y-4">
              {/* 1v1 vs Group vs Group */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Match Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMatchFormat("1v1")}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-semibold transition ${
                      matchFormat === "1v1"
                        ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
                        : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Swords className="h-3.5 w-3.5" />
                    1 vs 1
                  </button>
                  <button
                    type="button"
                    onClick={() => setMatchFormat("group")}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-semibold transition ${
                      matchFormat === "group"
                        ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
                        : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Users className="h-3.5 w-3.5" />
                    Group vs Group
                  </button>
                </div>
              </div>

              {/* Group Options */}
              {matchFormat === "group" && (
                <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-950/70 p-3.5">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Your Group / Squad Name
                    </label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. Dhaka Strikers"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Players Per Group
                    </label>
                    <select
                      value={groupSize}
                      onChange={(e) => setGroupSize(Number(e.target.value))}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value={2}>2 vs 2 (4 players total)</option>
                      <option value={3}>3 vs 3 (6 players total)</option>
                      <option value={4}>4 vs 4 (8 players total)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Public vs Direct Toggle */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Challenge Target
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setChallengeMode("public")}
                    className={`rounded-lg border py-2 text-xs font-semibold transition ${
                      challengeMode === "public"
                        ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
                        : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Public Lobby
                  </button>
                  <button
                    type="button"
                    onClick={() => setChallengeMode("direct")}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-semibold transition ${
                      challengeMode === "direct"
                        ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
                        : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Direct Player
                  </button>
                </div>
              </div>

              {/* Direct Player Fields */}
              {challengeMode === "direct" && (
                <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-950/70 p-3.5">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">
                      Opponent Player / Captain Username *
                    </label>
                    <input
                      type="text"
                      required={challengeMode === "direct"}
                      value={targetUsername}
                      onChange={(e) => setTargetUsername(e.target.value)}
                      placeholder="e.g. RakibFC or Player_B"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">
                      Opponent Facebook Link (Optional)
                    </label>
                    <input
                      type="text"
                      value={opponentFb}
                      onChange={(e) => setOpponentFb(e.target.value)}
                      placeholder="https://facebook.com/username (optional)"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Stake Selection */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Stake Per Player (Tk)
                </label>
                <select
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value={50}>50 Tk / player</option>
                  <option value={100}>100 Tk / player</option>
                  <option value={200}>200 Tk / player</option>
                  <option value={500}>500 Tk / player</option>
                </select>
              </div>

              <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>
                  Total Prize Pool:{" "}
                  <strong className="text-white">
                    {Number(stake) * (matchFormat === "group" ? groupSize * 2 : 2)} Tk
                  </strong>{" "}
                  locked securely in Escrow until match verification.
                </span>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="rounded-lg border border-zinc-800 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 transition"
                >
                  {challengeMode === "direct" ? "Send Challenge" : "Publish Challenge"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Accept / Join Escrow Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              {selectedMatch.format === "group"
                ? `Join ${selectedMatch.groupSize}v${selectedMatch.groupSize} Group Match`
                : selectedMatch.type === "direct"
                ? "Accept Direct Challenge"
                : "Join 1v1 Match"}
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Host: <span className="text-white font-semibold">{selectedMatch.host}</span>
              {selectedMatch.teamName ? ` (${selectedMatch.teamName})` : ""} · Stake:{" "}
              <span className="text-emerald-400 font-semibold">{selectedMatch.stake} Tk/player</span> · Total Pool:{" "}
              <span className="text-white font-semibold">{getTotalPool(selectedMatch)} Tk</span>
            </p>

            <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-3 text-xs text-emerald-300 mb-6 flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>
                {selectedMatch.stake} Tk will be locked in Escrow and a Match Room Code will unlock immediately.
              </span>
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedMatch(null)}
                className="rounded-lg border border-zinc-800 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmJoin}
                className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 transition"
              >
                Accept & Lock Escrow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Match Room & Settlement Modal */}
      {activeRoomMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                  {activeRoomMatch.status}
                </span>
                <h3 className="mt-2 text-lg font-bold text-white">
                  {activeRoomMatch.game} — Room & Settlement
                </h3>
                <p className="text-xs text-zinc-400">
                  {activeRoomMatch.host} vs{" "}
                  {activeRoomMatch.targetPlayer ||
                    (activeRoomMatch.format === "group"
                      ? `Challenger Group (${activeRoomMatch.groupSize}v${activeRoomMatch.groupSize})`
                      : "Opponent")}{" "}
                  · Prize Pool:{" "}
                  <span className="text-emerald-400 font-semibold">
                    {getTotalPool(activeRoomMatch)} Tk
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveRoomMatch(null)}
                className="rounded-lg border border-zinc-800 px-2.5 py-1 text-xs text-zinc-400 hover:text-white"
              >
                Close
              </button>
            </div>

            {/* Room Code Box */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400">
                  eFootball Match Room Code
                </span>
                {activeRoomMatch.roomCode && (
                  <button
                    type="button"
                    onClick={() => copyRoom(activeRoomMatch.roomCode)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 hover:underline"
                  >
                    {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiedCode ? "Copied" : "Copy Code"}
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveRoomCode} className="flex gap-2">
                <input
                  type="text"
                  value={roomCodeInput}
                  onChange={(e) => setRoomCodeInput(e.target.value)}
                  placeholder="Enter or update room code..."
                  className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-mono text-white focus:border-emerald-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-semibold text-white hover:bg-zinc-700 transition"
                >
                  Save Code
                </button>
              </form>
              <p className="text-[11px] text-zinc-500">
                Share the Room Number with your opponent or group members to play inside eFootball, then settle the result below.
              </p>
            </div>

            {/* Demo Result Settlement */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Trophy className="h-4 w-4 text-emerald-400" />
                <span>Verify Result & Release Escrow (Preview)</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() =>
                    handleSettleDemo(activeRoomMatch.teamName || activeRoomMatch.host)
                  }
                  className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500 hover:text-zinc-950 transition"
                >
                  {activeRoomMatch.teamName || activeRoomMatch.host} Won
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSettleDemo(
                      activeRoomMatch.targetPlayer ||
                        (activeRoomMatch.format === "group" ? "Group B" : "Opponent")
                    )
                  }
                  className="rounded-lg border border-zinc-700 bg-zinc-900 py-2 text-xs font-semibold text-zinc-200 hover:border-zinc-600 transition"
                >
                  {activeRoomMatch.targetPlayer ||
                    (activeRoomMatch.format === "group" ? "Group B" : "Opponent")}{" "}
                  Won
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Matches Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMatches.map((m) => {
          const isActiveRoom =
            m.status.startsWith("In Match") || m.status.startsWith("Settled");

          return (
            <div
              key={m.id}
              className="flex flex-col justify-between rounded-xl border border-zinc-800/90 bg-zinc-900/40 p-5 hover:border-zinc-700 transition"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="rounded-md bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                      {m.game}
                    </span>
                    <span className="rounded-md bg-zinc-800/90 border border-zinc-700 px-2 py-0.5 text-[10px] font-semibold text-zinc-200 uppercase">
                      {m.format === "group" ? `${m.groupSize}v${m.groupSize} Group` : "1v1"}
                    </span>
                    {m.type === "direct" && (
                      <span className="rounded-md bg-zinc-900 border border-zinc-700 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
                        Direct
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-medium text-amber-400">
                    {m.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 my-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 font-semibold text-zinc-200 text-xs">
                    {(m.teamName || m.host).slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-zinc-400">
                      {m.targetPlayer
                        ? `${m.host} → @${m.targetPlayer}`
                        : m.teamName
                        ? `Group: ${m.teamName} · Host ${m.host}`
                        : "Host Player"}
                    </p>
                    <p className="text-sm font-semibold text-white truncate">
                      {m.teamName || m.host}
                    </p>
                  </div>
                </div>

                {m.opponentFb && (
                  <a
                    href={
                      m.opponentFb.startsWith("http")
                        ? m.opponentFb
                        : `https://${m.opponentFb}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="mb-3 inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-emerald-400 transition"
                  >
                    <span>Opponent Facebook</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider">
                    Prize Pool ({m.stake} Tk/p)
                  </p>
                  <p className="text-base font-bold text-emerald-400">
                    {getTotalPool(m)} Tk
                  </p>
                </div>

                {isActiveRoom ? (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveRoomMatch(m);
                      setRoomCodeInput(m.roomCode || "");
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500 hover:text-zinc-950 transition"
                  >
                    Open Room
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedMatch(m)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-xs font-medium text-white hover:border-emerald-500/40 hover:text-emerald-400 transition"
                  >
                    {m.format === "group" ? (
                      <Users className="h-3.5 w-3.5" />
                    ) : (
                      <Swords className="h-3.5 w-3.5" />
                    )}
                    {m.type === "direct" ? "Accept" : "Join"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}