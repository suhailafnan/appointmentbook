"use client"

import { useCallback, useEffect, useState } from "react"
import { useAccount, usePublicClient, useWalletClient } from "wagmi"

import ABI from "@/contracts/AppointmentBook.json" // ABI file

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0x0Fdc9D5E5e60Ee94a1284eaDe8Fc16A07C65fBd7"

export const useAppointmentBook = () => {
  const { address } = useAccount()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const [appointments, setAppointments] = useState([])
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [hash, setHash] = useState("")

  // Read: number of appointments
  const fetchCount = useCallback(async () => {
    try {
      const result = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "getAppointmentCount",
      })
      setCount(Number(result))
    } catch (err) {
      console.error(err)
    }
  }, [publicClient])

  // Read: all appointments
  const fetchAppointments = useCallback(async () => {
    try {
      const result: any[] = []
      for (let i = 0; i < count; i++) {
        const a = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: ABI,
          functionName: "getAppointment",
          args: [i],
        })
        result.push(a)
      }
      setAppointments(result)
    } catch (err) {
      console.error(err)
    }
  }, [count, publicClient])

  // Write: add an appointment
  const addAppointment = async (note: string) => {
    if (!walletClient) return
    try {
      setIsLoading(true)
      setError("")
      setHash("")

      const tx = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "addAppointment",
        args: [note],
      })

      setHash(tx)
      await publicClient.waitForTransactionReceipt({ hash: tx })
      await fetchCount()
      await fetchAppointments()
    } catch (err: any) {
      setError(err?.message || "Error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCount()
  }, [fetchCount])

  useEffect(() => {
    if (count > 0) fetchAppointments()
  }, [count, fetchAppointments])

  return {
    appointments,
    count,
    addAppointment,

    isLoading,
    error,
    hash,
  }
}
