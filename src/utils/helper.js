
exports.timeSleep = async function (time = 1000) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}