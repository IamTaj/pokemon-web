import { ApiHandler, ApiMethod } from "@/types"
import axios from "axios"
import { POKEMON_DETAILS } from "./endpoints"

export const apiHandler: ApiHandler = {
  createRequest: (
    url: string,
    payload: Record<string, any>,
    headers: Record<string, any>
  ) => {
    return {
      url,
      method: ApiMethod.get,
      params: payload
    }
  },

  mapResponse: (title: string, response: any) => {
    const { data, status }: { data: any; status: number } = response || {}
    if (status === 200) {
      return {
        error: false,
        data
      }
    } else {
      return { error: true, data: response }
    }
  },

  apiCall: async (params = {}, customUrl?: string) => {
    const apiConfig = apiHandler.createRequest(
      customUrl || POKEMON_DETAILS,
      params,
      {}
    )
    const response = await axios(apiConfig)
    return apiHandler.mapResponse("fetch pokemon", response)
  }
}
