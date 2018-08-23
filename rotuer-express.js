var express = require('express')
//引入自定义模块handler
var handler = require('./handler-express')
//创建路由模块
var rotuer = express.Router()
// 监听用户请求 -- 中间件
// 添加配置规则
// get(查询) post(增加) put(修改) delete(删除)
rotuer.get('/',handler.getIndexPage)
      .get('/add',handler.getAddPage)
      .post('/add',handler.doAdd)
      .get('/edit',handler.getEditPage)
      .post('/edit',handler.doEdit)
      .get('/del',handler.doDelete)
      .post('/fileUpload',handler.doFileUpload)

//暴露成员给外部使用
module.exports = rotuer
// function rotuer(req,res){
//      //获取当前用户的路由
//      var url = req.url
//      //获得请求方式
//      var method = req.method
//     // 1.获取首页动态数据  req.url === '/' || req.url === '/index' mehtod === 'get'
//     if(url === '/' ||url === '/index' && method === 'GET') {
//         handler.getIndexPage(req,res)
//     }
//     //2 实现静态资源的加载 req.url === '/css/ | /images/'
//     if(url.indexOf('/images') ===0 && method === 'GET' || url.indexOf('/node_modules')===0 && method === 'GET'){
//         handler.getStaticSource(req,res)
//     }
//     //3 获取添加页面静态结构  req.url ==='/add'  method === 'get'
//     if(url === '/add' && method === 'GET'){
//         handler.getAddPage(req,res)
//     }
//     // 4.实现新增操作 req.url === '/add' method === 'post'
//     if(url=== '/add' && method === 'POST'){
//         handler.doAdd(req,res)
//     }
//     // 5.展示编辑动态页面 req.url === '/edit' method === 'get'
//     if(url.indexOf('/edit') === 0 && method === 'GET'){
//         handler.getEditPage(req,res)
//     }
//     // 6.实现编辑操作 req.url === '/edit?id=2' method ='post'
//      if(url === '/edit' && method === 'POST'){
//         handler.doEdit(req,res)
//     }
//     // 7.实现删除操作：req.url === '/del?id=2' method === 'get'
//     if(url.indexOf('/del')===0 && method === 'GET'){
//         handler.doDelete(req,res)
//     }
//     //8.实现文件的上传操作 req.url === 'fileUpload' method === 'post'
//     if(url ==='/fileUpload' && method === 'POST'){
//         handler.doFileUpload(req,res)
//     }
// }