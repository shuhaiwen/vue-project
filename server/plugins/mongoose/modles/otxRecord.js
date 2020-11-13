/*
 * @Author: your name
 * @Date: 2020-07-27 09:42:44
 * @LastEditTime: 2020-07-29 17:10:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\server\modles\otxRecord.js
 */ 
const mongoose=require('mongoose')
const otxRecordS=mongoose.Schema({
    Auth:{
        type:String, 
        default:'none'      
    },
    Function:{
        type:String
    },
    Type:{
        type:String
    },
    State:{
        type:String,
        default:'未完成'
    },
    UpDate:{
        type:Date,
        default:Date.now
    },
    Comments:{
        type:String,
        default:'注释...'
    }
})
const otxRecordM=mongoose.model("otxRecord",otxRecordS,"otxRecord")

module.exports=otxRecordM