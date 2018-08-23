// 使用express来实现创建服务器和响应用户请求
var express = require('express')
var app = express()
//添加监听端口
app.listen('4396',()=>{
    console.log('http://127.0.0.1:4396')
})
// 下面这个中间件就是用来告诉当前应用要使用express-art-template来进行模板的渲染
// art:是指能够用于解析的文件的扩展名，我们可以修改其为html
app.engine('html', require('express-art-template'))
// 下面这个配置是指定在什么环境下使用这个渲染方式
app.set('view options', {debug: process.env.NODE_ENV !== 'production'})

//静态资源托管
app.use(express.static('public'))

// 引入body-parse：它的作用是通过以中间件的方式设置参数的解析和传递方式
var bodyParser = require('body-parser')
// 进行参数传递时的配置
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var rotuer = require('./rotuer-express')
// 让当前应用使用我们制定的路由规则 ,挂载--use
// 注入路由
app.use(rotuer)