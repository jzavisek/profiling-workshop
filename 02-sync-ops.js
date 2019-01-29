'use strict'

const Koa = require('koa')
const fs = require('fs')
const path = require('path')

const tmp = path.join(__dirname, 'tmp')
const app = new Koa()

function sleep(ms) {
  let now = Date.now()
  while (Date.now() < now + ms) { 
    fs.closeSync(fs.openSync(tmp, 'a'))
  }
}

app.use(ctx => {
  sleep(10)
  ctx.body = 'Hello Koa'
})
 
const server = app.listen(3000)

process.on('SIGINT', function () {
  console.error('Caught SIGINT, shutting down.')
  server.close()
})
