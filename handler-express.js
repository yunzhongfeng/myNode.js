    var fs = require('fs')
    var template = require('art-template')
    var myModule = require('./dataModule-express')
    var formidable = require('formidable')
    var path = require('path')
    var queryString = require('querystring')
    var myurl = require('url')
    exports.getIndexPage = (req, res) => {
        // 1获取首页动态数据
        myModule.getAllData((err, data) => {
            if (err) {
                res.end('err')
            } else {
                //代表有数据,开始调用express-art-template模板动态渲染数据 
                res.render(__dirname + "/views/index.html", data)
                // var html = template(__dirname + "/views/index.html", data)
                // res.end(html)
            }
        })
    }
    //2 实现静态资源的加载
    exports.getStaticSource = (req, res) => {
        res.render(__dirname + "/views/add.html")
    }
    //3获取添加页面静态结构  req.url ==='/add'  method === 'get'
    exports.getAddPage = (req, res) => {
        res.render(__dirname + "/views/add.html")
    }
    // 4.实现文件的上传操作 req.url === 'fileUpload' method === 'post'
    exports.doFileUpload = (req, res) => {
        // console.log(req.body)
        //创建对象,Formidable
        var form = new formidable.IncomingForm()
        //设置编码格式
        form.encoding = 'utf-8'
        //设置文件保存的路径
        form.uploadDir = __dirname + "/public/images"
        //设置是否保留文件的拓展名
        form.keepExtensions = true
        //上传文件会执行parse函数,文件信息都保存在req中
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.json({
                    code: -1,
                    msg: '上传失败'
                })
            } else {
                //  console.log(files)
                var fileName = path.basename(files.img.path)
                res.json({
                    code: 200,
                    msg: '上传成功',
                    myImg: fileName
                })
            }
        })
    }
    // 5.展示编辑动态页面 req.url === '/edit' method === 'get'
    exports.getEditPage = (req, res) => {
        var url = req.url
        // console.log(url);  /edit?id=3
        var id = myurl.parse(url, true).query.id // myurl.parse(url,true) 第二个参数不为true的话为字符串
        //根据ID号获取相对应的数据对象 console.log(id); 3 =>数据模块的事
        myModule.getHeroById(id, (err, data) => {
            if (err) {
                res.end('404')
            } else {
                res.render(__dirname + "/views/edit.html", data)
            }
        })
    }
    // 6.实现编辑操作 req.url === '/edit?id=2' method ='post'
    exports.doEdit = (req, res) => {
        myModule.editUserDate(req.body, (err) => {
            if (err) {
                res.json({
                    code: -1,
                    msg: '编辑失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '编辑成功'
                })
            }
        })
    }
    // 7.实现删除操作：req.url === '/del?id=2' method === 'get'
    exports.doDelete = (req, res) => {
        var id = myurl.parse(req.url, true).query.id
        myModule.deleteHeroById(id, (err) => {
            if (err) {
                res.json({
                    code: -1,
                    msg: '删除失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '删除成功'
                })
            }

        })
    }
    // 8 实现新增操作 req.url === '/add' method === 'post'
    exports.doAdd = (req, res) => {
        myModule.addhero(req.body, (err) => {
            if (err) {
                res.json({
                    code: -1,
                    msg: '添加失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '添加成功'
                })
            }
        })
    }