"use client"

import { MoonStarIcon, SunMediumIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

export function ThemeToggleButton() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function handleToggle() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleToggle}>
      {mounted && resolvedTheme === "dark" ? (
        <MoonStarIcon className="size-4" />
      ) : (
        <SunMediumIcon className="size-4" />
      )}
    </Button>
  )
}
