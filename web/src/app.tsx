import { Dialog } from './components/ui/dialog'

import { CreateGoal } from './components/create-goal'
import { EmptyGoals } from './components/empty-goals'
import { Summary } from './components/summary'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-summary'
import { Loader } from './components/loader'
import { GenericError } from './components/generic-error'
import dayjs from 'dayjs'
import 'dayjs/locale/pt'

dayjs.locale('pt')

export function App() {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  })
  const hasSummary = data?.summary && data.summary.total > 0

  if (isLoading) return <Loader />
  if (isError && !isLoading) return <GenericError onReload={refetch} />

  return (
    <Dialog>
      {hasSummary ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}
