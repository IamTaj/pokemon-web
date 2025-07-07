"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

type Pokemon = {
  name: string
  id: number
  image: string
}

type PokemonHistoryContextType = {
  history: Pokemon[]
  addToHistory: (pokemon: Pokemon) => void
}

const PokemonHistoryContext = createContext<PokemonHistoryContextType | null>(
  null
)

export function usePokemonHistory() {
  const context = useContext(PokemonHistoryContext)
  if (!context) {
    throw new Error("usePokemonHistory must be used within a Provider")
  }
  return context
}

export function PokemonHistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<Pokemon[]>([])

  const addToHistory = (pokemon: Pokemon) => {
    setHistory((prev) => {
      if (prev?.find((p) => p?.name === pokemon?.name)) return prev
      return [pokemon]
    })
  }

  return (
    <PokemonHistoryContext.Provider value={{ history, addToHistory }}>
      {children}
    </PokemonHistoryContext.Provider>
  )
}
