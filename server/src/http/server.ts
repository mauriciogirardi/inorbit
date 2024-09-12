import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { env } from '../env'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { errorHandler } from './error-handler'
import { createGoalRoute } from './routes/create-goal'
import { getWeekPendingGoalsRoute } from './routes/get-week-pending-goals'
import { createGoalCompletionRoute } from './routes/create-goal-completion'
import { getWeekSummaryRoute } from './routes/get-week-summary'


const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, { origin: env.CORS_ORIGIN })

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(createGoalRoute)
app.register(getWeekPendingGoalsRoute)
app.register(createGoalCompletionRoute)
app.register(getWeekSummaryRoute)

app
  .listen({ port: env.PORT })
  .then(() => console.log('HTTP server is running!'))
