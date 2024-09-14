import { api } from '../lib/api'

type CreateGoalProps = {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  desiredWeeklyFrequency,
  title,
}: CreateGoalProps) {
  await api.post('/goals', {
    title,
    desiredWeeklyFrequency,
  })
}
