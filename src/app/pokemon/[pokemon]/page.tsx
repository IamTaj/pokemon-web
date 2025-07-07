"use client"
import Breadcrumb from "@/components/Breadcrumbs"
import PokemonCard from "@/components/PokemonCards"
import ClientGuard from "@/context/ClientGuard"
import { usePokemonHistory } from "@/context/PokemonHistoryContext"
import React from "react"

const Page = () => {
  const { history } = usePokemonHistory() || {}
  return (
    <ClientGuard>
      <div className="min-h-screen bg-gray-50 p-6 text-black">
        <Breadcrumb />
        <div className="flex justify-center items-center">
          {history.map((pokemon: any, index: number) => (
            <PokemonCard key={index} props={pokemon} isDetail />
          ))}
        </div>
      </div>
    </ClientGuard>
  )
}

export default Page
