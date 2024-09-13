import { X } from 'lucide-react'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from './ui/radio-group'
import { FORM_CREATE_META_RADIOS } from '../constants/form-create-meta'
import { Button } from './ui/button'

export function CreateGoal() {
  return (
    <DialogContent>
      <div className="space-y-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-500" />
            </DialogClose>
          </div>

          <DialogDescription className="text-sm text-zinc-400">
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form className="flex flex-col justify-between h-[calc(100%_-_100px)] ">
          <div className="space-y-6 overflow-y-auto mb-6 scrollbar-thin pr-2">
            <div className="space-y-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                className="w-full"
                autoFocus
                placeholder="Praticar exercício, meditar, etc..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="group">Quantas vezes na semana?</Label>
              <RadioGroup id="group">
                {FORM_CREATE_META_RADIOS.map((item, index) => (
                  <RadioGroupItem
                    tabIndex={1}
                    value={String(index + 1)}
                    key={item.label}
                  >
                    <RadioGroupIndicator />
                    <span className="text-zinc-300 text-sm font-medium leading-none">
                      {item.label}
                    </span>
                    <span className="text-lg leading-none">{item.emoji}</span>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button variant="secondary" className="w-full">
                Fechar
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
