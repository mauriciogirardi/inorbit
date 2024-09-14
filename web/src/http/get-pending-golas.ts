import { api } from '../lib/api'

export type GetPendingGoalsResponse = {
  pendingGoals: {
    id: string
    title: string
    completionCount: number
    desiredWeeklyFrequency: number
  }[]
}

export async function getPendingGoals() {
  const { data } = await api.get<GetPendingGoalsResponse>('/pending-goals')
  return data.pendingGoals
}
