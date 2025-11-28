import "./globals.css"
import { Providers } from "@/components/Provider"

export const metadata = {
  title: "Appointment Book",
  description: "Simple Web3 Appointment Tracker",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
