/*
 * @Author: your name
 * @Date: 2020-07-20 16:05:14
 * @LastEditTime: 2020-07-27 10:37:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\server\routes\login.js
 */ 
module.exports=app=>{
    const AdminUser=require('../plugins/mongoose/modles/AdminUser')
    const assert = require('http-assert')

    app.post('/admin/api/login',async (req,res)=>{
        console.log('收到/admin/api/login请求...')
        //1.解析请求体数据 username,password为请求时传来的数据
        const {username,password}=req.body
        assert((username || password), 422, '请输入用户名和密码')
        //2.查找数据库
        const user=await AdminUser.findOne({username}).select('+password')
        assert(user, 422, '用户名不存在')
        //3.校验密码
        const isOK=require('bcryptjs').compareSync(password,user.password)
        assert(isOK,422,'密码错误')
        //4.登录成功，响应数据
        res.send({
            message: '登录成功',
            username: user.username,
            password: user.password
        })
    })
}