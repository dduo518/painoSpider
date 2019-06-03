const redis = require('redis')
const conf = require('./../../conf')
const client = redis.createClient({
  host: conf.redis.host,
  port: conf.redis.port
});
client.on('error', function (err) {
  console.log('redis connect error')
})

const redisClient = {
  get: async function (key) {
    return new Promise((resolve, reject) => {
      client.get(key, function (err, val) {
        if (err) {
          reject(err)
        } else {
          resolve(val)
        }
      })
    })
  },
  decr: async function (key) {
    return new Promise((resolve, reject) => {
      client.decr(key, function (err, val) {
        if (err) {
          reject(err)
        } else {
          resolve(val)
        }
      })
    })
  },
  rpush: async function (key, val) {
    return new Promise((resolve, reject) => {
      client.rpush(key, val, function (err, val) {
        if (err) {
          reject(err)
        } else {
          resolve(val)
        }
      })
    })
  }
}

module.exports = redisClient