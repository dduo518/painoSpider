const { start } = require('./start')
const debug = require('debug')('spride')
const { download, uploadPictureToBucket } = require('./downLoad')
const path = require('path')
const redisClient = require('./utils/redis')
const { Collection } = require('./models')
const config = require('./../config')
const rimraf = require("rimraf");
const mongoose = require('mongoose')
const async = require('async')
const { timeSleep} = require('./utils/helper')
module.exports = async function (conf, getIndexUrl, getSource) {
  const key = 'global:' + process.env.NODE_ENV
  var pageCount = await redisClient.get(key)
  debug(pageCount, " start")
  while (pageCount > 0) {
    await redisClient.decr(key)
    let result = []
    try {
      debug(`${conf.url}${pageCount}`)
      result = await start(`${conf.url}${pageCount}`, getIndexUrl)
      debug(result)
    } catch (error) {
      console.error(error)
    }
    while (result.length > 0) {
      try {
        const page = result.pop();
        const imageUrl = await start(page.uri, getSource)
        page.imageUrl = JSON.stringify(imageUrl)
        page.source = conf.name
        const resp = await downloadAndUploads(imageUrl, page.title)

        page.locations = JSON.stringify(resp)
        page.bucket = config.bucket.bucketName

        await Collection.create(page);

        const dirPath = path.join(process.cwd(), './source', page.title)
        rimraf.sync(dirPath);

        await timeSleep();
      } catch (e) {
        console.log(e)
      }

      debug('end!')
    }
    pageCount = pageCount - 1
    debug("end page :", pageCount)
  }
}


async function downloadAndUploads(imageUrl, title) {
  const resp = [] 
    await new Promise((resolve, reject) => {
      let i = 0;
      async.eachLimit(imageUrl, 1, async function (item) {
        i++ 
      const dirPath = path.join(process.cwd(), './source')
      const _id = mongoose.Types.ObjectId()
      const filename = `${_id}-${i}.png`;
      await download(dirPath, title, filename, item)
      const uploadResp = await uploadPictureToBucket(filename, path.join(dirPath, title, filename))
      
      resp.push({
        location: uploadResp.Location,
        etag: uploadResp.ETag,
        dirPath
      })
      return i
    }, function (err, result) {
        if (err) { 
          reject(err)
        }else {
          resolve(result)
        }
    })
  })
  console.log(resp)
  return resp
}
