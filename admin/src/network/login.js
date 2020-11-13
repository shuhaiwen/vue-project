/*
 * @Author: your name
 * @Date: 2020-07-15 19:25:44
 * @LastEditTime: 2020-07-23 19:27:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\admin\src\network\login.js
 */ 
import {serve} from './request'
//登录请求
export function loginReq(data){
   return serve({
        url:'/login',
        method:'post',
        data
    })
}
//export default loginReq