import { useEffect, useState } from "react"
import FilterComponent from "@/components/FilterComponent"
import PokemonCard from "@/components/PokemonCards"
import useAllPokemonData from "../hooks/usePokemon"
import { LOADING, NEXT, PAGE, PREV } from "@/constants"

export default function PageBody() {
  const [currentPage, setCurrentPage] = useState(1)
  const { pokemonData, loading, error } = useAllPokemonData(currentPage) || {}
  const [filteredData, setfilteredData] = useState<any[]>([])

  useEffect(() => {
    setfilteredData(pokemonData)
  }, [pokemonData])

  const handlePageChange = (page: number) => {
    if (page < 1) return
    setCurrentPage(page)
  }

  return (
    <div>
      <div className=" bg-gray-100 py-4">
        <FilterComponent
          pokemonData={pokemonData}
          setfilteredData={setfilteredData}
        />
      </div>
      <div className="mt-4 space-y-2">
        {loading ? (
          <div className="text-black">{LOADING}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredData?.map((data: any, index: number) => (
              <PokemonCard key={index} props={data} />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-2 mt-8 text-black">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
          {PREV}
        </button>

        <span className="px-4 font-semibold"> {`${PAGE} ${currentPage}`}</span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          {NEXT}
        </button>
      </div>
    </div>
  )
}
