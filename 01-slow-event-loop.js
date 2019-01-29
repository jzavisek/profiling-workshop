'use strict'

const Koa = require('koa')
const app = new Koa()

function sleep(ms) {
  const future = Date.now() + ms
  while (Date.now() < future) {}
}
 
app.use(ctx => {
  sleep(30)
  ctx.body = 'Hello Koa'
})
 
const server = app.listen(3000)

process.on('SIGINT', function () {
  console.error('Caught SIGINT, shutting down.')
  server.close()
})
