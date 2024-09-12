import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../functions/get-week-pending-goals'

export async function getWeekPendingGoalsRoute(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/pending-goals', async (request, reply) => {
      const { pendingGoals } = await getWeekPendingGoals()

      return reply.status(201).send({ pendingGoals })
    })
}
