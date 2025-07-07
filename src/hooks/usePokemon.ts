import { useEffect, useState } from "react"
import { apiHandler } from "@/api/apiService"
import { POKEMON_DETAILS } from "@/api/endpoints"
import { ROUTES } from "@/routes"

const ITEMS_PER_PAGE = 52

const useAllPokemonData = (page: number) => {
  const [allData, setAllData] = useState<Map<number, any[]>>(new Map())
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const offset = (page - 1) * ITEMS_PER_PAGE

  useEffect(() => {
    const fetchData = async () => {
      if (allData?.has(page)) return

      setLoading(true)
      try {
        const listResponse = await apiHandler?.apiCall(
          { limit: ITEMS_PER_PAGE, offset },
          `${POKEMON_DETAILS}${ROUTES?.POKEMON}`
        )

        if (listResponse?.error) throw new Error("Failed to fetch Pokémon list")
        const data = listResponse?.data

        const details = await Promise.all(
          data?.results?.map(async (pokemon: any) => {
            try {
              const detailRes = await apiHandler?.apiCall({}, pokemon?.url)
              const detail = detailRes?.data

              const speciesRes = await apiHandler?.apiCall(
                {},
                detail?.species?.url
              )
              const species = speciesRes?.data

              return {
                name: detail?.name,
                image: detail?.sprites?.front_default,
                color: species?.color?.name,
                types: detail?.types?.map((t: any) => t?.type?.name),
                stats: detail?.stats?.map((stat: any) => ({
                  name: stat?.stat?.name,
                  value: stat?.base_stat
                })),
                abilities: detail?.abilities?.map((a: any) => a?.ability?.name),
                moves: detail?.moves?.slice(0, 5)?.map((m: any) => m?.move?.name)
              }
            } catch (error) {
              console.error(`Error for ${pokemon.name}:`, error)
              return null
            }
          })
        )

        const cleaned = details?.filter(Boolean)
        setAllData((prev) => new Map(prev)?.set(page, cleaned))
      } catch (err) {
        console.error(err)
        setError("Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page])

  return {
    pokemonData: allData?.get(page) || [],
    loading,
    error
  }
}

export default useAllPokemonData
