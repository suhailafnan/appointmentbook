"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { WalletConnect } from "./Wallet-connect"
import { useAppointmentBook } from "@/hooks/useAppointmentBook"

const Sample = () => {
  const { isConnected } = useAccount()
  const { appointments, count, addAppointment, loading, error, hash } =
    useAppointmentBook()

  const [note, setNote] = useState("")

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-xl mb-2">Please connect your wallet</h2>
        <WalletConnect />
      </div>
    )
  }

  const submit = async () => {
    if (!note.trim()) return
    await addAppointment(note)
    setNote("")
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      {/* Wallet button */}
      <WalletConnect />

      <h1 className="text-3xl font-bold">Appointment Book</h1>

      {/* Add Appointment */}
      <div className="space-y-2">
        <input
          className="border w-full px-4 py-2 rounded"
          placeholder="Enter appointment note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={loading || !note}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Appointment"}
        </button>
      </div>

      {hash && <p className="text-green-600 text-sm break-all">Tx: {hash}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Appointments ({count})
        </h2>

        {appointments.length === 0 && (
          <p className="text-gray-500">No appointments yet.</p>
        )}

        <div className="space-y-3">
          {appointments.map((a: any, i: number) => (
            <div key={i} className="border p-3 rounded">
              <p><strong>User:</strong> {a[0]}</p>
              <p><strong>Note:</strong> {a[1]}</p>
              <p>
                <strong>Time:</strong> {new Date(Number(a[2]) * 1000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sample
