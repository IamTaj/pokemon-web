"use client"
import { POKEMON_FINDER, VIEW_FAVORITES } from "@/constants"
import { ROUTES } from "@/routes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const Header = () => {
  const { FAVORITE, HOMEPAGE } = ROUTES
  const pathname = usePathname()
  const isFavoritesPage = pathname === FAVORITE

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-2xs px-4 py-3 flex justify-between items-center">
      <Link href={HOMEPAGE} className="text-2xl font-bold text-blue-600">
        {POKEMON_FINDER}
      </Link>
      {Boolean(!isFavoritesPage) && (
        <Link
          href={FAVORITE}
          className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-sm text-black px-4 py-2 rounded-full shadow hover:scale-105 hover:shadow-md transition-transform duration-200">
          {`⭐ ${VIEW_FAVORITES}`}
        </Link>
      )}
    </header>
  )
}

export default Header
