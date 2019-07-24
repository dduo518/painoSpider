const Crawler = require("crawler");
const debug = require('debug')('spride')

const start = async function (url, cb) {
  return new Promise((resolve, reject) => {
    const c = new Crawler({
      maxConnections: 10,
      callback: function (error, res, done) {
        debug("callback")
        if (error) {
          reject(error)
        } else {
          resolve(cb(res.$))
        }
        done();
      }
    });
    c.queue(url)
  })

}
module.exports = {
  start
}