"use client"
import { SEARCH, SELECT } from "@/constants"
import useDebounce from "@/hooks/useDebounce"
import { capitalizeFirstLetter } from "@/utils/capitilazied"
import { useState, useEffect } from "react"

export default function FilterComponent({
  pokemonData,
  setfilteredData
}: {
  pokemonData: any[]
  setfilteredData: any
}) {
  const uniqueTypes = [
    ...new Set(
      pokemonData?.flatMap((pokemon: Record<string, any>) => pokemon?.types)
    )
  ]

  const [type, setType] = useState("")
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 400)
  const debouncedType = useDebounce(type, 400)

  useEffect(() => {
    const noTypeSelected = debouncedType === ""
    const noSearchText = debouncedSearch?.trim() === ""

    if (noTypeSelected && noSearchText && pokemonData) {
      setfilteredData(pokemonData)
      return
    }

    const filtered = pokemonData?.filter((pokemon) => {
      const matchesType =
        noTypeSelected || pokemon?.types?.includes(debouncedType)
      const matchesName =
        noSearchText ||
        pokemon?.name?.toLowerCase()?.includes(debouncedSearch?.toLowerCase())
      return matchesType && matchesName
    })

    setfilteredData(filtered)
  }, [debouncedType, debouncedSearch, pokemonData])

  return (
    <div className="bg-gray-100 p-4 sm:p-6 rounded-md mb-6">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4 md:flex-row md:items-center">
        <select
          className="w-full md:w-52 border border-gray-300 rounded-md p-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={debouncedType}
          onChange={(e) => setType(e.target.value)}>
          <option value="">{SELECT}</option>
          {uniqueTypes.map((t) => (
            <option key={t} value={t}>
              {capitalizeFirstLetter(t)}
            </option>
          ))}
        </select>

        <div className="flex w-full">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              value={capitalizeFirstLetter(search)}
              onChange={(e) => setSearch(e?.target?.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-900 text-white px-4 py-2 rounded-r-md">
            {SEARCH}
          </button>
        </div>
      </form>
    </div>
  )
}
