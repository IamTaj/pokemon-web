"use client"

import { PokemonCardProps } from "@/types"
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react"

type PokemonData = PokemonCardProps["props"]

type FavoritePokemonContextType = {
  favorites: PokemonData[]
  toggleFavorite: (pokemon: PokemonData) => void
  isFavorite: (name: string) => boolean
}

const FavoritePokemonContext = createContext<FavoritePokemonContextType | null>(
  null
)

export const useFavoritePokemon = () => {
  const context = useContext(FavoritePokemonContext)
  if (!context) {
    throw new Error("useFavoritePokemon must be used within a Provider")
  }
  return context
}

export const FavoritePokemonProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [favorites, setFavorites] = useState<PokemonData[]>([])

  useEffect(() => {
    const stored = localStorage?.getItem("favorites")
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage?.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (pokemon: PokemonData) => {
    setFavorites((prev) => {
      const exists = prev?.find((p) => p?.name === pokemon?.name)
      return exists
        ? prev?.filter((p) => p?.name !== pokemon?.name)
        : [...prev, pokemon]
    })
  }

  const isFavorite = (name: string) => favorites?.some((p) => p?.name === name)

  return (
    <FavoritePokemonContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritePokemonContext.Provider>
  )
}
