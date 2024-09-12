import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { createGoal } from '../../functions/create-goal'

export async function createGoalRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.coerce.number(),
        }),
      },
    },
    async (request, reply) => {
      const { desiredWeeklyFrequency, title } = request.body

      await createGoal({ title, desiredWeeklyFrequency })
    }
  )
}
