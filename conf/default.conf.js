module.exports = {
  sprideURL: {
    hqgq: {
      name: "环球钢琴",
      en: "global",
      num: 2114,
      url: 'https://www.hqgq.com/search/?q=&typeid=pu&b=qupu&page='
    },
    cc: {
      name: "虫虫钢琴",
      en: "cc",
      num: 1200,
      host:"http://www.gangqinpu.com",
      url: 'http://www.gangqinpu.com/pux/list.aspx?best=0&zhuid=0&typeid=0&runsystem=0&ordersint=2&naidu=0&putype=0&currentPage='
    }
  },
  mysql: {
    host: 'cdb-cwn52bic.bj.tencentcdb.com',
    port: 10049,
    user: 'root',
    password: '380125f4c8a5e8197465d82806a617facbf8e1d6',
    database: 'collections_dev'
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  bucket: {
    secretId: 'AKIDhBWdXGj1UmrlT9br5rUtgFZxvfBbnBk9',
    secretKey: 'KcjgaMQUN6j9SgoHuNnnhZGnUeqpeiGh',
    bucketName: 'pic-dev-1256209849',
    region: 'ap-guangzhou'
  }
}