import type { Metadata } from "next"
import { Inter, Roboto } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"

import { QueryProvider } from "@/components/providers/query-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ToastProvider } from "@/components/providers/toast-provider"

import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "AI Crawling",
  description: "Scalable tab navigation setup",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${roboto.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <ToastProvider />
            </ThemeProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
