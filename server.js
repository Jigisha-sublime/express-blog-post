// server set up with node js only.

const http = require('http')
const _ = require('lodash')
const fs = require('fs')


const server = http.createServer((req, res) => {
  let path = './views'
  switch (req.url) {
    case '/':
      path += '/index.html'
      res.statusCode = 200
      break;
    case '/about':
      path += '/about.html'
      res.statusCode = 200
      break;
    case '/about-us':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '/404.html'
      res.statusCode = 404
      break;
  }
  res.setHeader('Content-Type', 'text/html')
  fs.readFile(path, (err, data) => {
    if (err) console.log(err)
    else {
      res.end(data)
    }
  })

})

server.listen(3000, () => {
  console.log('server running on port 3000')
})