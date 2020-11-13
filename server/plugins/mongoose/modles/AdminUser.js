/*
 * @Author: your name
 * @Date: 2020-07-20 14:42:11
 * @LastEditTime: 2020-07-25 14:32:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\server\modles\AdminUser.js
 */ 
const mongoose = require("mongoose")
const adminUserSchema = new mongoose.Schema({
    username: { type: String },
    password: {
        type: String,
        select: false,
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    },
    level: { type: String }
})

const AdminUser = mongoose.model('adminUser', adminUserSchema, 'adminUser')

module.exports = AdminUser