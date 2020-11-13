import axios from 'axios'

function serve(config){
    //创建实例对象
    const instance=axios.create({
        baseURL:process.env.VUE_APP_API_URL_LOGIN,
        timeout:5000
    })
    //请求拦截器，在请求发出之前处理
    instance.interceptors.request.use(config=>{
        return config
    },error=>{
        return Promise.reject(error)
    })
    //响应拦截器
    instance.interceptors.response.use(res=>{
        return res
    },error=>{
        return Promise.reject(error)
    })
    return instance(config)
}

export {
    serve
}