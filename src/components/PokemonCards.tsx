"use client"

import { capitalizeFirstLetter } from "@/utils/capitilazied"
import Link from "next/link"
import { usePokemonHistory } from "@/context/PokemonHistoryContext"
import { PokemonCardProps } from "@/types"
import { useFavoritePokemon } from "@/context/FavouriteContext"
import {
  ABILITIES,
  DETAILS,
  FAVORITE,
  MARK,
  NAME,
  SOME_MOVES,
  STATS,
  TYPE
} from "@/constants"
import { ROUTES } from "@/routes"

export default function PokemonCard({
  props,
  isDetail = false
}: PokemonCardProps) {
  const { name, id, image, types, stats, abilities, moves } = props || {}
  const { addToHistory } = usePokemonHistory() || {}
  const { isFavorite, toggleFavorite } = useFavoritePokemon() || {}

  const handleClick = () => {
    addToHistory({ ...props })
  }

  const handleFavToggle = (props: any) => {
    toggleFavorite(props)
  }

  const FavoriteBadge = (props: any) => {
    return (
      <button
        onClick={() => handleFavToggle(props)}
        className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold shadow-md transition 
        ${
          isFavorite(name)
            ? "bg-gradient-to-r from-pink-500 to-yellow-400 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }
      `}
        title={isFavorite(name) ? "Unmark Favorite" : "Mark Favorite"}>
        {isFavorite(name) ? FAVORITE : MARK}
      </button>
    )
  }

  if (isDetail) {
    return (
      <div className="relative max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <FavoriteBadge {...props} />
        <div className="bg-cyan-200 flex justify-center p-6">
          <img src={image} alt={name} className="h-48 w-48 object-contain" />
        </div>
        <div className="bg-orange-200 p-6 text-sm leading-6 space-y-2">
          <p>
            <span className="font-semibold">{`${NAME} :`}</span>{" "}
            {capitalizeFirstLetter(name)}
          </p>
          <p>
            <span className="font-semibold">{`${TYPE} :`}</span>{" "}
            {types?.join(", ")}
          </p>
          <p>
            <span className="font-semibold">{`${STATS} :`}</span>{" "}
            {stats?.map((s: any) => `${s?.name}: ${s?.value}`).join(", ")}
          </p>
          <p>
            <span className="font-semibold">{`${ABILITIES} :`}</span>{" "}
            {abilities?.join(", ")}
          </p>
          <p>
            <span className="font-semibold">{`${SOME_MOVES} :`}</span>{" "}
            {moves?.join(", ")}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      key={id}
      className="relative bg-white rounded-lg shadow-sm p-4 text-center text-black">
      <FavoriteBadge {...props} />
      <img src={image} alt={name} className="w-24 h-24 mx-auto mb-4" />
      <h2 className="font-semibold text-lg mb-2">
        {capitalizeFirstLetter(name)}
      </h2>
      <Link
        href={`${ROUTES?.POKEMON}/${name}`}
        className="text-blue-900 font-medium text-sm"
        onClick={handleClick}>
        {`${DETAILS} →`}
      </Link>
    </div>
  )
}
