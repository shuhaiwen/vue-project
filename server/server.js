/*
 * @Author: your name
 * @Date: 2020-07-16 09:09:49
 * @LastEditTime: 2020-07-31 17:37:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\server\server.js
 */
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())//跨域支持
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//连接数据库
require('./plugins/mongoose')()
//登录接口
require('./routes/login')(app)
//otx数据
require('./routes/otxRecord')(app)
app.get('/', (req, res) => {
    console.log('收到/请求...')
    res.send('登录成功')
})
//监听端口号
app.listen(8087, () => {
    console.log('服务器已开启，正在监听http://localhost:8087  ...')
})