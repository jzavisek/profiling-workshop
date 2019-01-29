'use strict'

const Koa = require('koa')
const crypto = require('crypto')

const cache = []
const app = new Koa()

function addToCache(ms) {
  const item = crypto.randomBytes(1024).toString('hex')
  cache.push(item)
}

app.use(ctx => {
  addToCache()
  ctx.body = 'Hello Koa'
})
 
const server = app.listen(3000)

process.on('SIGINT', function () {
  console.error('Caught SIGINT, shutting down.')
  server.close()
})
