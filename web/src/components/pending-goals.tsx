import { Loader2, PlusIcon } from 'lucide-react'
import { OutlineButton } from './ui/outline-button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPendingGoals } from '../http/get-pending-golas'
import { GenericError } from './generic-error'
import { createGoalCompletion } from '../http/create-goal-completion'

export function PendingGoals() {
  const queryClient = useQueryClient()
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60,
  })

  if (isLoading) return <Loader2 className="animate-spin text-pink-500" />
  if (isError)
    return <GenericError onReload={refetch} className="h-min w-full my-5" />

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)
    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return data?.map(goal => (
    <OutlineButton
      key={goal.id}
      disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
      onClick={() => handleCompleteGoal(goal.id)}
    >
      <PlusIcon className="size-4 text-zinc-400" />
      {goal.title}
    </OutlineButton>
  ))
}
