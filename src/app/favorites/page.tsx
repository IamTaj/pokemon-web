"use client"

import { useFavoritePokemon } from "@/context/FavouriteContext"
import PokemonCard from "@/components/PokemonCards"
import Breadcrumb from "@/components/Breadcrumbs"
import { FAVORITE_TITLE, NO_FAVORITE_MESSAGE } from "@/constants"

export default function FavoritesPage() {
  const { favorites } = useFavoritePokemon() || {}

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-black">
      <Breadcrumb />
      <h1 className="text-2xl font-bold mb-6">{FAVORITE_TITLE}</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">{NO_FAVORITE_MESSAGE}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites?.map((pokemon: any, index: number) => (
            <PokemonCard key={index} props={pokemon} />
          ))}
        </div>
      )}
    </div>
  )
}
