/*
 * @Author: your name
 * @Date: 2020-07-23 19:26:17
 * @LastEditTime: 2020-07-30 17:03:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\admin\src\network\otxData.js
 */
import { serve } from './request'

function download(data) {
    return serve({
        url: '/otx/download',
        method: 'post',
        data
    })
}

function update(data){
    return serve({
        url:'/otx/update',
        method:'post',
        data
    })
}

function updateToPieChart(){
    return serve({
        url:'/otx/pieChart',
        method:'get'
    })
}
function updateToBarChart(){
    return serve({
        url:'/otx/barChart',
        method:'get'
    })
}
export {
    update,
    download,
    updateToPieChart,
    updateToBarChart
}
