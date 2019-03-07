const Router = require('koa-router')
const router = new Router()

router.all('/api', (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', '*')
  ctx.set('Access-Control-Allow-Headers', '*')
  if (ctx.request.method == "OPTIONS") {
    ctx.response.status = 200
  }
  next()
})

router.post('/api', (ctx, next) => {
  console.log(JSON.stringify(ctx.request.body))
  ctx.body = JSON.stringify({
    "code": "200",
    "message": "",
    "body": {}
  })
})

router.get('/', async (ctx, next) => {
  let title = 'index'
  await ctx.render('index.ejs', {
    title,
  })
})

router.get('/demoA', async (ctx, next) => {
  let title = 'demoA'
  await ctx.render('demoA.ejs', {
    title,
  })
})

router.get('/demoB', async (ctx, next) => {
  let title = 'demoB'
  await ctx.render('demoB.ejs', {
    title,
  })
})

router.get('/demoC', async (ctx, next) => {
  let title = 'demoC'
  await ctx.render('demoC.ejs', {
    title,
  })
})

router.get('/phoneList', async (ctx, next) => {
  let title = '手机号采集'
  await ctx.render('phoneList.ejs', {
    title,
  })
})

router.get('/heatMap', async (ctx, next) => {
  let title = '热力图'
  await ctx.render('heatMap.ejs', {
    title,
  })
})

module.exports = router
