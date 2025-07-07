"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { usePokemonHistory } from "@/context/PokemonHistoryContext"
import { ROUTES } from "@/routes"

export default function ClientGuard({
  children
}: {
  children: React.ReactNode
}) {
  const { history } = usePokemonHistory()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (history?.length === 0 && pathname !== ROUTES?.HOMEPAGE) {
      router?.replace(ROUTES?.HOMEPAGE)
    }
  }, [history, router])

  if (history?.length === 0) {
    return null
  }

  return <>{children}</>
}
