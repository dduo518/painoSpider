const { start } = require('./start')
const { getSource, getIndexUrl } = require('./parse/detail')
const { download, uploadPictureToBucket } = require('./downLoad')
const { removeWatermark } = require('./imageTool')
const path = require('path')
const fs = require('fs')
const redisClient = require('./utils/redis')
const { Collection } = require('./models')
const conf = require('./../config')
const rimraf = require("rimraf");
module.exports = async function () {
  const key = 'global:' + process.env.NODE_ENV
  var pageCount = await redisClient.get(key)
  console.log(pageCount, " start")
  while (pageCount > 0) {
    const result = await start(`https://www.hqgq.com/search/?q=&typeid=pu&b=qupu&page=${pageCount}`, getIndexUrl)

    while (result.length > 0) {
      const page = result.pop();
      let imageUrl = await start(page.uri, getSource)
      page.imageUrl = JSON.stringify(imageUrl)
      page.source = 'global'
      const resp = await downloadAndUploads(imageUrl, page.title)
      page.locations = JSON.stringify(resp)
      page.bucket = conf.bucket.bucketName
      await Collection.create(page);
      const dirPath = path.join(process.cwd(), './source', page.title)
      rimraf.sync(dirPath);
      await timeSleep();
      console.log('end!')
    }
    await redisClient.decr(key)
    pageCount = pageCount - 1
    console.log("end page :", pageCount)
  }
}


async function downloadAndUploads(imageUrl, title) {
  const resp = await Promise.all(imageUrl.map(async (item, i) => {
    const dirPath = path.join(process.cwd(), './source')
    const filename = `${title}-${i}.png`;
    await download(dirPath, title, filename, item)
    // await removeWatermark(path.join(dirPath, title, filename), i === 0)
    const uploadResp = await uploadPictureToBucket(filename, path.join(dirPath, title, filename))
    return {
      location: uploadResp.Location,
      etag: uploadResp.ETag,
      dirPath
    }
  }))
  return resp
}

async function timeSleep(time = 5000) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}