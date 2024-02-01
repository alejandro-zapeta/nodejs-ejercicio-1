import React from "react"
import Fastify from 'fastify'
import { renderToStaticNodeStream } from 'react-dom/server'
import App from "../src/components/App.jsx"
import path from "path"

const fastify = Fastify({ logger: true })
const root = path.join(__dirname, '..', 'public')
fastify.register(require('@fastify/static'), { root, prefix: '/public/', })

fastify.get('/', async function handler(request, reply) {
  const jsxElement =
    <html>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
      <div id="root"><App /></div>
      <script defer src={`/public/client.js`}></script>
    </html>
  const stream = renderToStaticNodeStream(jsxElement)
  reply.send(stream)
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}