import { api } from '../lib/api'

export async function createGoalCompletion(goalId: string) {
  await api.post('/completions', {
    goalId,
  })
}
