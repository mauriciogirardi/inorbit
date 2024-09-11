import { db } from '../db'
import { goals } from '../db/schema'

type CreateGoalRequest = {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  desiredWeeklyFrequency,
  title,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  return {
    goal: result[0],
  }
}
