"use client";
import { useState } from "react";
import {
  Wallet,
  ShieldCheck,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

const INITIAL_TRANSACTIONS = [
  {
    id: 1,
    type: "Deposit",
    method: "bKash",
    ref: "TXN8941205",
    amount: 500,
    status: "Completed",
    time: "Today, 02:15 PM",
  },
  {
    id: 2,
    type: "Escrow Lock",
    method: "1v1 eFootball",
    ref: "MATCH-104",
    amount: -100,
    status: "Locked",
    time: "Yesterday, 09:40 PM",
  },
  {
    id: 3,
    type: "Escrow Win",
    method: "1v1 eFootball",
    ref: "MATCH-104",
    amount: 100,
    status: "Completed",
    time: "Yesterday, 10:12 PM",
  },
];

export default function WalletPage() {
  const [balance, setBalance] = useState(500);
  const [escrowLocked, setEscrowLocked] = useState(0);
  const [activeAction, setActiveAction] = useState("deposit"); // "deposit" | "withdraw"

  // Deposit form state
  const [method, setMethod] = useState("bKash");
  const [amount, setAmount] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [notice, setNotice] = useState("");

  // Withdraw form state
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("bKash");
  const [receiverNumber, setReceiverNumber] = useState("");

  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  const handleDeposit = (e) => {
    e.preventDefault();
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount < 20) {
      setNotice("Minimum deposit amount is 20 Tk.");
      return;
    }

    setBalance((prev) => prev + numericAmount);

    const newTx = {
      id: Date.now(),
      type: "Deposit",
      method,
      ref: trxId.trim() ? trxId.trim().toUpperCase() : `DEP-${Math.floor(100000 + Math.random() * 900000)}`,
      amount: numericAmount,
      status: "Completed",
      time: "Just now",
    };

    setTransactions((prev) => [newTx, ...prev]);
    setNotice(`${numericAmount.toFixed(2)} Tk added to your wallet via ${method}.`);
    setAmount("");
    setSenderNumber("");
    setTrxId("");
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    const numericAmount = Number(withdrawAmount);
    if (!numericAmount || numericAmount < 50) {
      setNotice("Minimum withdrawal amount is 50 Tk.");
      return;
    }
    if (numericAmount > balance) {
      setNotice("Insufficient available wallet balance.");
      return;
    }

    setBalance((prev) => prev - numericAmount);

    const newTx = {
      id: Date.now(),
      type: "Withdraw",
      method: withdrawMethod,
      ref: receiverNumber.trim() || "WD-REQUEST",
      amount: -numericAmount,
      status: "Processing",
      time: "Just now",
    };

    setTransactions((prev) => [newTx, ...prev]);
    setNotice(`Withdrawal request of ${numericAmount.toFixed(2)} Tk submitted.`);
    setWithdrawAmount("");
    setReceiverNumber("");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 bg-[#09090b] text-zinc-100">
      {/* Page Header */}
      <div className="border-b border-zinc-800/80 pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Wallet & Escrow
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Manage your Taka balance, deposit via bKash/Nagad, and track escrow locks.
        </p>
      </div>

      {/* Top Balance Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="rounded-2xl border border-zinc-800/90 bg-[#0c0e0d] p-5">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Available Balance</span>
            <Wallet className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-white">
            {balance.toFixed(2)}{" "}
            <span className="text-sm font-semibold text-emerald-400">Tk</span>
          </p>
          <p className="mt-1 text-[11px] text-zinc-500">
            Ready for 1v1 & group challenges
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800/90 bg-[#0c0e0d] p-5">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Locked in Escrow</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-3 text-2xl font-bold text-white">
            {escrowLocked.toFixed(2)}{" "}
            <span className="text-sm font-semibold text-zinc-400">Tk</span>
          </p>
          <p className="mt-1 text-[11px] text-zinc-500">
            Released automatically after match result
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800/90 bg-[#0c0e0d] p-5">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Payment Channels</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-3 text-lg font-bold text-white">bKash · Nagad</p>
          <p className="mt-1 text-[11px] text-zinc-500">
            Instant BDT wallet flow (Frontend preview)
          </p>
        </div>
      </div>

      {/* Action Switch + Form & History */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Deposit / Withdraw Form */}
        <div className="lg:col-span-5 rounded-2xl border border-zinc-800/90 bg-[#0c0e0d] p-6">
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-zinc-800 bg-zinc-950 p-1 mb-5">
            <button
              type="button"
              onClick={() => {
                setActiveAction("deposit");
                setNotice("");
              }}
              className={`inline-flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
                activeAction === "deposit"
                  ? "bg-emerald-500 text-zinc-950"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <ArrowDownLeft className="h-3.5 w-3.5" />
              Deposit Tk
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveAction("withdraw");
                setNotice("");
              }}
              className={`inline-flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
                activeAction === "withdraw"
                  ? "bg-emerald-500 text-zinc-950"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
              Withdraw
            </button>
          </div>

          {notice && (
            <div className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs text-emerald-300">
              {notice}
            </div>
          )}

          {activeAction === "deposit" ? (
            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Select Method
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {["bKash", "Nagad"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMethod(m)}
                      className={`rounded-lg border py-2 text-xs font-semibold transition ${
                        method === m
                          ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
                          : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-3 text-[11px] text-zinc-400 leading-relaxed">
                Send Money to <span className="text-white font-semibold">01700-000000</span> ({method} Personal) and enter your Transaction ID below.
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Amount (Tk)
                </label>
                <input
                  type="number"
                  min="20"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 200"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Sender {method} Number
                </label>
                <input
                  type="text"
                  value={senderNumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Transaction ID (TrxID)
                </label>
                <input
                  type="text"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  placeholder="e.g. 9B7X4K2M"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-emerald-500 py-2.5 text-xs font-bold tracking-wide text-zinc-950 uppercase hover:bg-emerald-400 transition"
              >
                Submit Deposit
              </button>
            </form>
          ) : (
            <form onSubmit={handleWithdraw} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Withdraw Via
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {["bKash", "Nagad"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setWithdrawMethod(m)}
                      className={`rounded-lg border py-2 text-xs font-semibold transition ${
                        withdrawMethod === m
                          ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
                          : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Amount to Withdraw (Tk)
                </label>
                <input
                  type="number"
                  min="50"
                  required
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Minimum 50 Tk"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Receiver {withdrawMethod} Number
                </label>
                <input
                  type="text"
                  required
                  value={receiverNumber}
                  onChange={(e) => setReceiverNumber(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-emerald-500 py-2.5 text-xs font-bold tracking-wide text-zinc-950 uppercase hover:bg-emerald-400 transition"
              >
                Request Withdrawal
              </button>
            </form>
          )}
        </div>

        {/* Right: Transaction History */}
        <div className="lg:col-span-7 rounded-2xl border border-zinc-800/90 bg-[#0c0e0d] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-white">Recent Activity</h2>
            <span className="text-xs text-zinc-400">{transactions.length} entries</span>
          </div>

          <div className="divide-y divide-zinc-800/80">
            {transactions.map((tx) => {
              const isPositive = tx.amount > 0;
              return (
                <div
                  key={tx.id}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        {tx.type}
                      </span>
                      <span className="rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">
                        {tx.method}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-500 flex items-center gap-1.5">
                      <span>Ref: {tx.ref}</span>
                      <span>·</span>
                      <Clock className="h-3 w-3 inline" />
                      <span>{tx.time}</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p
                      className={`text-sm font-bold ${
                        isPositive ? "text-emerald-400" : "text-zinc-200"
                      }`}
                    >
                      {isPositive ? `+${tx.amount}` : tx.amount} Tk
                    </p>
                    <p className="text-[11px] text-zinc-500">{tx.status}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}