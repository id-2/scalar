import fastifyStatic from '@fastify/static'
import fastify from 'fastify'
import { join } from 'node:path'

const app = await fastify({ logger: true })

await app.register(fastifyStatic, {
  root: join(__dirname, 'public'),
  prefix: '/',
})

app.get('/', (_request, reply) => {
  reply.sendFile('api-reference-cdn.html', { cacheControl: false }) // overriding the options disabling cache-control headers) // serving path.join(__dirname, 'public', 'myHtml.html') directly
})

// Run the server!
try {
  await app.listen({ port: 3173 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
