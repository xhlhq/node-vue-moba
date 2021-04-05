import axios from 'axios'
import vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

//对请求操作进行操作
http.interceptors.request.use(function (config) {
    //为请求添加带token的请求头
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

//全局捕获
//给http加拦截器
//对服务器返回的代码进行拦截
http.interceptors.response.use(res => {
    return res
},err => {
    //对返回代码的错误进行展示
    // console.log(err.response.data.message)
    if(err.response.data.message){
        vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
    }

    //状态码是401则跳转到登录页
    if(err.response.status == 401){
        router.push('/login')
    }
    return Promise.reject(err)
})

export default http