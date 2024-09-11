import z from 'zod'

const envSchema = z.object({
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3333),
})

export const env = envSchema.parse(process.env)
