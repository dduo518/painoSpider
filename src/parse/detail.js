const cheerio = require("cheerio")
exports.getIndexUrl = function ($) {
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