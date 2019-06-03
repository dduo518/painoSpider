const Crawler = require("crawler");

const start = async function (url, cb) {
  return new Promise((resolve, reject) => {
    const c = new Crawler({
      maxConnections: 10,
      callback: function (error, res, done) {
        if (error) {
          reject(error)
        } else {
          var $ = res.$;
          resolve(cb($))
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