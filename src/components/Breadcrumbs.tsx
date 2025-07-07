"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { capitalizeFirstLetter } from "@/utils/capitilazied"
import { HOME } from "@/constants"

export default function Breadcrumb() {
  const pathname = usePathname()
  const isFavoritesPage = pathname === "/favorites"
  const segments = pathname?.split("/")?.filter(Boolean)

  if (segments?.length < 2 && !isFavoritesPage) return null

  return (
    <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex space-x-2">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            {HOME}
          </Link>
        </li>
        <li>/</li>
        <li className="capitalize text-gray-800 font-medium">
          {capitalizeFirstLetter(segments?.[segments?.length - 1])}
        </li>
      </ol>
    </nav>
  )
}
