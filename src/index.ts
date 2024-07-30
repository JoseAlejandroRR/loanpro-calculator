import { serve } from '@hono/node-server'
import { Context, Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { AddressInfo } from 'node:net';
import open from 'open';
import { logger } from './utils/Logger';



const app = new Hono()

//app.all('/results/*', (c) => c.text('folders!'))
app.get(
  '/_reporting/*',
  serveStatic({
    root: './_reporting',
    rewriteRequestPath: (path) => {
      return path.replace(/^\/_reporting\//, './')
    }
  })
)

app.get('/', (c) => c.text('Hello Jose.js!'))

serve({
  fetch: app.fetch,
  port: 5001,
}, async (info: AddressInfo) => {
  logger.success(`Server at: http://localhost:${info.port}/`)
  await open(`http://localhost:${info.port}/_reporting/jest-stare/index.html`);
})