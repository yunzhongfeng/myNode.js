// 这个模块专门用来处理数据
// 数据操作一共有四种：增加，删除，修改，查询
var mysql = require('mysql')
//1连接数据库
var connection = mysql.createPool({
    host: '127.0.0.1', //主机名
    user: 'root', //用户名
    password: 'root', //密码
    database: 'num20' //要操作的数据库名
})

exports.getAllData = (callback) => {
    //创建查询语句
    var sql = 'select id,name,gender,img from heros where isDelete = 0'
    //执行查询命令
    connection.query(sql, (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, {
                heros: result
            })
        }
    })
}
//2 开始增加的数据处理
exports.addhero = (newObj, callback) => {
    //创建增加语句
    var sql = `insert into heros values(null,'${newObj.name}','${newObj.gender}','${newObj.img}',DEFAULT)`
    //执行增加命令
    connection.query(sql, (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result)
        }
    })
}
//3 根据id获取对应的数据对象
exports.getHeroById = (id, callback) => {
    //创建查询语句
    var sql = 'select * from heros where id = ? and isDelete = 0'
    //执行查询命令
    connection.query(sql, [id], (err, result) => {
        if (err) {
            callback(err)
        } else {
            // 这里获取的是数组但是调用者需要的是对象，同时我们发现这个sql语句如果执行成功，只可能会有一条记录
            callback(null, result[0])
        }
    })
}
//4 根据id来编辑用户数据更新数据库
exports.editUserDate = (fields, callback) => {
    //创建更新语句
    var sql = `update heros set ? where id = ?`
    //执行更新命令
    connection.query(sql, [fields,fields.id], (err, result) => {
        if (err) {
            callback(err)
        } else {
            // 不用传数据过去 这边的result为一个对象,里面有受影响的行数
            callback(null)
        }
    })
}
//5 根据id删除对应数据
exports.deleteHeroById = (id, callback) => {
  //创建删除语句,只想要更改 isDelete的状态就OK了
  var sql = `update heros set isDelete = 1 where id = ?`
  //执行更新命令
  connection.query(sql, [id], (err, result) => {
    if (err) {
        callback(err)
    } else {
        // 不用传数据过去
        callback(null)
    }
})
}