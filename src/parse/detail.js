const cheerio = require("cheerio")
const debug = require('debug')('spride')
const conf = require('./../../conf')
exports.getIndexUrl = function ($) {
  debug("getIndexUrl")
  const _html = $('body').html();
  $ = cheerio.load(_html, { decodeEntities: false })
  const list = $(".result-list").find('ul').find('li');
  const resultURL = []
  list.map((i, item) => {
    const result = {}
    result.uri = 'https://www.hqgq.com' + $(item).find('a').attr('href')
    result.category = $(item).find('a').find('span.txt-label').text()
    result.title = $(item).find('a')[0].children[2].data.replace(/\n/gi, "")
    result.title = result.title.replace(/\s*/gi, "")
    const desc = $(item).find('div.text-list-info')
    result.artist = $($(desc).find('span')[0]).text()
    result.settle = $($(desc).find('span')[2]).text()
    result.difficulty = $(desc).find('.play-difficulty').attr('data-difficulty')
    resultURL.push(result);
  })
  return resultURL;
}

exports.getSource = function ($) {
  const box = $('.pu-box');
  const srcs = []
  box.map((i, item) => {
    srcs.push($(item).find('img').attr('src'))
  })
  return srcs
}


exports.getCCUrl = async function ($) {
  debug("getCCUrl")
  const _html = $('body').html();
  $ = cheerio.load(_html, { decodeEntities: false })
  const tbody = $("tbody").find("tr");
  const list = []
  tbody.map((i,item) => {
    if (i != 0) {
      list.push({
        artist: $($(item).find("td")[0]).text(),
        title: $($(item).find("td")[1]).text(),
        uri: conf.sprideURL.cc.host+$($(item).find("td")[1]).find('a').attr('href'),
        settle: $($(item).find("td")[2]).text()
      })
    }
  })
  debug(list)
  return list
}

exports.getCCSource = function ($) {
  const box = $('#swiper-wrapper').find('.swiper-slide');
  const srcs = []
  debug("getCCSource")
  box.map((i, item) => {
    if (i != 0 || i != (box.length - 1)) {
      srcs.push($(item).find('img').attr('src'))
    }
  })
  return srcs
}