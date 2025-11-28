"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { WalletConnect } from "./Wallet-connect"
import { useAppointmentBook } from "@/hooks/useAppointmentBook"
import { 
  Calendar, 
  Clock, 
  Plus, 
  Loader2, 
  User, 
  Copy, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';

// --- Utility Components & Functions ---

const shortenAddress = (addr: string) => {
  if (!addr) return '';
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

const CopyBadge = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium transition-colors group"
      title="Copy Address"
    >
      <User size={12} className="text-slate-400 group-hover:text-indigo-500" />
      {shortenAddress(text)}
      {copied ? <CheckCircle2 size={12} className="text-green-600" /> : <Copy size={12} className="opacity-0 group-hover:opacity-100" />}
    </button>
  );
};

// --- Main Component ---

const Sample = () => {
  const { isConnected, address } = useAccount()
  const { appointments, count, addAppointment, loading, error, hash } = useAppointmentBook()

  const [note, setNote] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  // Show success message briefly when a hash is generated
  useEffect(() => {
    if (hash) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [hash]);

  const submit = async () => {
    if (!note.trim()) return
    await addAppointment(note)
    setNote("")
  }

  // --- 1. Disconnected State UI ---
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6 border border-slate-100">
          <div className="mx-auto bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mb-4">
            <Calendar size={40} className="text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Connect your wallet to manage and view appointments on the blockchain.</p>
          </div>
          <div className="flex justify-center">
            <WalletConnect />
          </div>
        </div>
      </div>
    )
  }

  // --- 2. Connected State UI ---
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Calendar size={20} className="text-white" />
            </div>
            <h1 className="font-bold text-lg hidden sm:block">Appointment Book</h1>
          </div>

          <div className="flex items-center gap-3">
             {/* RainbowKit Button */}
             <WalletConnect />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-8 mt-6">
        
        {/* Create Appointment Card */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
              <Plus size={18} className="text-indigo-600" />
              New Appointment
            </h2>
            <p className="text-sm text-slate-500 mb-4">Add a new note to the blockchain appointment book.</p>
            
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  className="w-full min-h-[100px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-all resize-none text-sm"
                  placeholder="e.g. Discuss Q4 Marketing Strategy with the team..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={280}
                />
                <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                  {note.length}/280
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-400 hidden sm:block">
                  Transactions are permanent.
                </div>
                <button
                  onClick={submit}
                  disabled={loading || !note.trim()}
                  className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Add Appointment"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Feedback Messages (Success/Error/Hash) */}
          {(showSuccess || error) && (
            <div className={`px-6 py-3 border-t ${error ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
              {showSuccess && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-green-700 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Transaction Sent!</span>
                  </div>
                  {hash && (
                     <span className="text-xs bg-green-200 px-2 py-0.5 rounded-full break-all font-mono opacity-80">
                       {shortenAddress(hash)}
                     </span>
                  )}
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 text-red-700 text-sm">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}
            </div>
          )}
        </section>

        {/* List Section */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-lg font-semibold text-slate-800">History</h2>
            <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">
              {Number(count) || 0}
            </span>
          </div>

          <div className="space-y-3">
            {appointments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                <Clock size={40} className="mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500 font-medium">No appointments yet</p>
                <p className="text-slate-400 text-sm">Create your first entry above.</p>
              </div>
            ) : (
              appointments.map((appt: any, i: number) => {
                // Adjust indices based on your Solidity return data structure
                // Assuming: [0]: User Address, [1]: Note, [2]: Timestamp
                const creator = appt[0];
                const text = appt[1];
                const timestamp = appt[2];
                
                const date = new Date(Number(timestamp) * 1000);
                
                return (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start gap-4">
                      
                      {/* Avatar Placeholder based on address */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0 text-indigo-600 font-bold text-xs">
                        {creator ? creator.slice(2,4).toUpperCase() : '??'}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                           <CopyBadge text={creator} />
                           <span className="text-xs text-slate-400 flex items-center gap-1">
                             {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </span>
                        </div>
                        
                        <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap break-words mt-2">
                          {text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

      </main>
    </div>
  )
}

export default Sample