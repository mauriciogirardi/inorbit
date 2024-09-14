import { CheckCircle, PlusIcon } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { InOrbitIcon } from '../icons/in-orbit-icon'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../http/get-summary'
import dayjs from 'dayjs'
import { PendingGoals } from './pending-goals'

export function Summary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  })

  const summary = data?.summary
  if (!summary) return null

  const firstDayOfWeek = dayjs().startOf('week').format('D MMMM')
  const lasDayOfWeek = dayjs().endOf('week').format('D MMMM')
  const completedPercentage = Math.round(
    (summary.completed * 100) / summary.total
  )

  return (
    <div className=" py-10 w-full md:max-w-md px-5 mx-auto space-y-6">
      <div className="flex gap-4 items-center justify-between flex-wrap">
        <div className="flex gap-2 items-center">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lasDayOfWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <PlusIcon className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="space-y-3">
        <Progress max={15} value={8}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{summary.completed}</span> de{' '}
            <span className="text-zinc-100">{summary.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <div className="flex gap-3 flex-wrap">
        <PendingGoals />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {summary.goalsPerDay &&
          Object.entries(summary.goalsPerDay).map(([date, value]) => {
            const weekDay = dayjs(date).format('dddd')
            const formattedDate = dayjs(date).format('DD [de] MMMM')
            return (
              <div className="space-y-4" key={date}>
                <h3 className="font-medium ">
                  <span className="capitalize">{weekDay} </span>
                  <span className="text-zinc-400 text-xs">
                    ({formattedDate})
                  </span>
                </h3>

                <ul className="space-y-3">
                  {value.map(goal => {
                    const time = dayjs(goal.completedAt).format('HH:mm')

                    return (
                      <li className="flex items-center gap-2" key={goal.id}>
                        <CheckCircle className="size-4 text-pink-500" />
                        <span className="text-zinc-400 text-sm">
                          Você completou{' '}
                          <span className="text-zinc-100 font-medium">
                            “{goal.title}”
                          </span>{' '}
                          às{' '}
                          <span className="text-zinc-100 font-medium">
                            {time}h
                          </span>
                        </span>
                        <button
                          type="button"
                          className="text-zinc-400 text-sm underline hover:text-zinc-100"
                        >
                          Desfazer
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
      </div>
    </div>
  )
}
