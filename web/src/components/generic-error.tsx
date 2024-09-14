import { TriangleAlertIcon } from 'lucide-react'
import { Button } from './ui/button'
import { twMerge } from 'tailwind-merge'

type GenericErrorProps = {
  message?: string
  title?: string
  onReload?: () => void
  className?: string
}

export function GenericError({
  message = 'Houve um error ao carregar os dados, tente mais tarde!',
  title = 'Erro',
  onReload,
  className,
}: GenericErrorProps) {
  return (
    <div
      className={twMerge(
        'flex flex-col items-center justify-center h-dvh',
        className
      )}
    >
      <div className="max-w-72 text-center flex flex-col items-center gap-2">
        <TriangleAlertIcon className="size-10 text-orange-500" />
        <h2 className="text-2xl font-medium">{title}</h2>
        <span className="text-zinc-400">{message}</span>
        <Button onClick={onReload} variant="secondary" className="mt-5">
          Tente novamente
        </Button>
      </div>
    </div>
  )
}
