import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { getWeekSummary } from '../../functions/get-week-summary'

export async function getWeekSummaryRoute(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/summary', async (request, reply) => {
      const { summary } = await getWeekSummary()

      return reply.status(201).send({ summary })
    })
}
