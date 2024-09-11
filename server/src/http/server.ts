import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { env } from '../env'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal.routes'
import { errorHandler } from './error-handler'
import { pendingGoalsRoute } from './routes/pending-goals.routes'
import { goalCompletionRoute } from './routes/goal-completion.routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, { origin: '*' })

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(createGoalRoute)
app.register(pendingGoalsRoute)
app.register(goalCompletionRoute)

app
  .listen({ port: env.PORT })
  .then(() => console.log('HTTP server is running!'))
