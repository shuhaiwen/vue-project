/*
 * @Author: your name
 * @Date: 2020-07-20 11:36:14
 * @LastEditTime: 2020-07-28 20:56:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\server\plugins\mongoose.js
 */
module.exports = () => {
    //连接数据库
    const mongoose = require("mongoose");
    mongoose
        .connect("mongodb://127.0.0.1:27017/vueDb", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("数据库连接成功!!!"))
        .catch((error) => console.log(`数据库连接失败，错误原因${error}`));
    //加载modle
    require('./modles/AdminUser')
    require('./modles/otxRecord')
}

