//引入
var mysql = require('mysql')
// 2.创建数据库连接:这里定义一个变量接收是因为后期的sql执行方法中需要使用到这个连接对象
var connection = mysql.createPool({
    // 主机名
    host:'127.0.0.1',
    //用户名
    user:'root',
    password:'root',
    //要操作的数据库名
    database:'num20'
})
//  3.打开连接：连接也可以不打开，后期的操作会默认打开最近创建的连接对象
//4 创建查询命令
var obj = {
    id : 6,
    name : '王麻子111',
    gender:'女',
    img: '1.jpg'
}
 //var sql = `insert into heros values(null,'${obj.name}','${obj.gender}','${obj.img}')`
// var sql = `update heros set name ='${obj.name}',gender='${obj.gender}',img='${obj.img}' where id ='${obj.id}'`
 var sql = `select * from heros`
// var sql = `update heros set ? where id= ?`
//5.执行Sql命令
// connection.query(sql,[obj,obj.id],(err,result,fields)=> {
//     if(err){
//         console.log(err)
//     }else {
//         console.log(result)
//         console.log(fields)
//     }
// })
connection.query(sql,(err,result,fields)=> {
    if(err){
        console.log(err)
    }else {
        console.log(result)
        console.log(fields)
    }
})