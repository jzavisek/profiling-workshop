const mongojs = require('mongojs')
const fastify = require('fastify')

const db = mongojs('localhost:27017/npm')
const col = db.collection('modulesIndexed')
const app = fastify()

const findNewest = () => new Promise((resolve, reject) =>
  col.find().sort({modified: -1}).limit(5, (err, data) => err ? reject(err) : resolve(data)))

app.get('/', async function (req, reply) {
  findNewest()
    .then(findNewest)
    .then(findNewest)
    .then(findNewest)
    .then(findNewest)
    .then(findNewest)
    .then(newest => {
      reply.send({
        newest
      })
    })
})

app.listen(3000)
