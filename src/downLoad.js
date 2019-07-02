const fs = require("fs");
const path = require("path");
const request = require("request");
const COS = require('cos-nodejs-sdk-v5');
const conf = require('./../conf')
const download = async (dirPath, dirName, fileName, uri) => {
  const _dirPath = getPath(dirPath, dirName)
  let stream = fs.createWriteStream(path.join(_dirPath, fileName));
  const url = uri
  return new Promise((resolve, reject) => {
    request(url).pipe(stream).on("close", function (err) {
      // console.log("done:", fileName)
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    });
  })
}

function getPath(sourcePath, dirName) {
  const _dirPath = path.join(sourcePath, dirName);
  if (!fs.existsSync(_dirPath)) {
    console.log("不存在文件夹")
    fs.mkdirSync(_dirPath)
  }
  return _dirPath
}

const cos = new COS({
  SecretId: conf.bucket.secretId,
  SecretKey: conf.bucket.secretKey
});
async function uploadPictureToBucket(key, filePath) {
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket: conf.bucket.bucketName,
      Region: conf.bucket.region,
      Key: key,
      Body: fs.createReadStream(filePath),
    }, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    });
  })
}

module.exports = {
  download,
  uploadPictureToBucket
}
