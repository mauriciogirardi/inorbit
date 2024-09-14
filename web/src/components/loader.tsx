import { Loader2 } from 'lucide-react'
import { InOrbitIcon } from '../icons/in-orbit-icon'

export function Loader() {
  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="relative flex items-center justify-center">
        <Loader2 className="absolute size-14 animate-spin text-violet-500" />
        <Loader2 className="absolute size-24 animate-spin text-pink-500" />
        <InOrbitIcon />
      </div>
    </div>
  )
}
