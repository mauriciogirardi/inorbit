import { api } from '../lib/api'

export type GetSummaryResponse = {
  summary: {
    completed: number
    total: number
    goalsPerDay: Record<
      string,
      {
        id: string
        title: string
        completedAt: string
      }[]
    >
  }
}

export async function getSummary() {
  const { data } = await api.get<GetSummaryResponse>('/summary')
  return data
}
