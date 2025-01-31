import "./globals.css"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import type React from "react"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "Symbolic",
  description: "A minimalistic and clean web design",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>{children}</body>
    </html>
  )
}

