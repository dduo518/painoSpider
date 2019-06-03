const defaultConf = require('./default.conf')
const prodConf = require('./prod.conf')
console.log('运行环境:', process.env.NODE_ENV)
let conf = {}
if (process.env.NODE_ENV === 'prod') {
  conf = Object.assign({}, defaultConf, prodConf)
} else {
  conf = Object.assign({}, defaultConf)
}

module.exports = conf