const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(827, 1122)
const fs = require('fs')
const path = require('path')

// const imgPath = path.join(__dirname, '001.png')
// const imgPathOut = path.join(__dirname, '002.png')


const removeWatermark = async function (imgPath, isTop) {
  const originImage = await loadImage(imgPath)
  const img1Path = path.join(__dirname, '1.png')
  const ctx = canvas.getContext('2d')
  ctx.drawImage(originImage, 0, 0, 827, 1122)
  const img1 = await loadImage(img1Path)
  isTop && ctx.drawImage(img1, 620, 45, 700, 85)
  ctx.drawImage(img1, 30, 1046, 400, 85)
  const out = fs.createWriteStream(imgPath)
  const stream = canvas.createJPEGStream()
  stream.pipe(out)
  return new Promise(resolve => {
    out.on('finish', () => {
      console.log('The JPEG file was created.')
      resolve()
    })
  })
}
// removeWatermark(imgPath, true)
module.exports = {
  removeWatermark
}
