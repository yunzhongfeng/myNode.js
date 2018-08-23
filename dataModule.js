// 这个模块专门用来处理数据
// 数据操作一共有四种：增加，删除，修改，查询
var fs = require('fs')
//1从json格式文件中读出数据
exports.getAllData = (callback)=> {
    //2 读取指定的数据
    fs.readFile(__dirname+'/data/data.json',(err,data)=> {
         if(err) {
             callback(err)
         }else {
             //2.2 将获取的内容转换为用户需要的类型
            callback(null,JSON.parse(data.toString()))
         }
    })
}
//2 开始增加的数据处理
exports.addhero = (newObj,callback) => {
    fs.readFile(__dirname+'/data/data.json',(err,data)=> {
         if(err){
             callback(err)
         }else {
             //2.1读取json格式数据,转换为对象或者数组
             var dataObj = JSON.parse(data.toString())
             //2.2 获取最后一个元素的id号 进行 +1
             if(dataObj.heros.length==0){
                dataObj.heros.id=1
             }else{
                newObj.id = dataObj.heros[dataObj.heros.length-1].id +1
             }
            //  console.log(newObj)
            //  return
             //2.3 将新数据添加到数组中去
             dataObj.heros.push(newObj) 
             //2.4 将添加了数据的数组重新写入到json文件
             fs.writeFile(__dirname+'/data/data.json',JSON.stringify(dataObj,null,' '),(err)=>{
                if(err){
                    callback(err)
                }else {
                    callback(null)
                }
           })
         }
    })
}
//3 根据id获取对应的数据对象
exports.getHeroById = (id,callback) => {
    this.getAllData((err,data)=> {
        if(err){
            callback(err)
        }else {
            // 说明我们已经成功的获取数据，并且数据的格式是一个对象
            // console.log(data)
            data.heros.forEach((value,index)=>{
                // 在进行id比较的时候不能添加类型的判断
                if(value.id == id){
                    callback(null,value)
                }
            })
        }
    })
}
//4 根据id来编辑用户数据更新数据库
exports.editUserDate = (fields,callback) => {
      this.getAllData((err,data)=>{
          if(err){
              callback(err)
          }else{
               // 在使用forEach的时候，value值只是原始值的副本。所以对副本进行修改，原始值不变
               data.heros.forEach((value,index)=> {
                    //判断id是否和传过来的id相同
                    if(value.id == fields.id){
                        value.name = fields.name
                        value.gender = fields.gender
                        value.img = fields.img
                        //将数据重新写入到数据文件中
                        fs.writeFile(__dirname+'/data/data.json',JSON.stringify(data,null,' '),(err)=>{
                            if(err){
                                callback(err)
                            }else{
                                callback(null)
                            }
                        })
                    }
               })
          }
      })   
  }
//5 根据id删除对应数据
exports.deleteHeroById = (id,callback)=> {
    this.getAllData((err,data)=>{
           if(err){
            callback(err)
           }else{
                  data.heros.forEach((value,index)=> {
                      if(value.id == id){
                          data.heros.splice(index,1)
                          return
                      }
                  })
                  //将数据重新写入文件
                  fs.writeFile(__dirname+'/data/data.json',JSON.stringify(data,null,' '),(err)=>{
                          if(err){
                              callback(err)
                          }else{
                              callback(null)
                          }
                  })
               
           }
       })

    }