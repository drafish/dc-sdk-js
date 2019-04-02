const Koa = require('koa')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser');
const static = require('koa-static')
const path = require('path')
const app = new Koa()
const router = require('./router')
const initWs = require('./ws')

app.use(static(path.join(__dirname, '../dist')))
console.log(path.join(__dirname, '../dist'))
app.use(bodyParser({
  detectJSON: function (ctx) {
    return ctx.path === '/api';
  }
}));
app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}))
app.use(router.routes())

const server = require('http').Server(app.callback())
initWs(server)

let port = process.env.PORT || 8081
console.log(port)
server.listen(port, function () {
  console.log(`server listen at port ${port}`)
})
