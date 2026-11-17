"use client";
import { ArrowDownRight, ArrowUpRight, CheckCircle2, History, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function WalletPage() {
  const [balance, setBalance] = useState(500.00);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bKash");
  const [phone, setPhone] = useState("");
  const [trxId, setTrxId] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleDeposit = (e) => {
    e.preventDefault();
    if (!amount || !trxId) {
      alert("Please enter amount and transaction ID");
      return;
    }
    setBalance(balance + Number(amount));
    setSuccessMsg(`Successfully requested deposit of ${amount} Tk via ${method}! Balance updated.`);
    setAmount("");
    setTrxId("");
    setPhone("");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Wallet & Escrow</h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage your funds, deposit via bKash/Nagad, and withdraw winnings instantly.
        </p>
      </div>

      {/* Balance Card */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 mb-8 shadow-xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Available Balance</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white">{balance.toFixed(2)}</span>
              <span className="text-xl font-bold text-emerald-400">Tk</span>
            </div>
            <p className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Protected by E-Arena Escrow Security
            </p>
          </div>

          <div className="flex gap-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-center">
              <p className="text-[10px] uppercase text-slate-400">Total Deposited</p>
              <p className="text-lg font-bold text-white">1,500 Tk</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-center">
              <p className="text-[10px] uppercase text-slate-400">Total Withdrawn</p>
              <p className="text-lg font-bold text-emerald-400">800 Tk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Deposit Form Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Deposit Box */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <ArrowDownRight className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Add Funds (Deposit)</h3>
          </div>

          <form onSubmit={handleDeposit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Payment Gateway</label>
              <div className="grid grid-cols-2 gap-3">
                {["bKash", "Nagad"].map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`rounded-xl border py-2.5 text-xs font-bold transition ${
                      method === m
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-slate-800 bg-slate-950 text-slate-400"
                    }`}
                  >
                    {m} Personal
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-400 leading-relaxed">
              Send money to <span className="text-emerald-400 font-bold">01700000000</span> ({method}) using Send Money option, then copy the TrxID below.
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Amount (Tk)</label>
              <input
                type="number"
                placeholder="e.g. 500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Sender Phone Number</label>
              <input
                type="text"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Transaction ID (TrxID)</label>
              <input
                type="text"
                placeholder="e.g. 9N8X76TR54"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none uppercase"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
            >
              Verify & Deposit
            </button>
          </form>
        </div>

        {/* Withdraw & History Info */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <ArrowUpRight className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Withdraw Winnings</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Withdrawals are processed automatically within 15 minutes after admin verification. Minimum withdrawal is 200 Tk.
            </p>
            <button
              onClick={() => alert("Withdrawal request modal will open here!")}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition"
            >
              Request Withdrawal
            </button>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-4">
              <History className="h-5 w-5 text-slate-400" />
              <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 text-xs">
                <div>
                  <p className="font-semibold text-white">Deposit via bKash</p>
                  <p className="text-[10px] text-slate-400">Trx: 8N7K92PL · Today</p>
                </div>
                <span className="font-bold text-emerald-400">+500 Tk</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 text-xs">
                <div>
                  <p className="font-semibold text-white">Match Win: eFootball</p>
                  <p className="text-[10px] text-slate-400">Escrow Payout · Yesterday</p>
                </div>
                <span className="font-bold text-emerald-400">+100 Tk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}