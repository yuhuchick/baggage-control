import axios from "axios"
import { getToken, removeToken } from "../utils";

//创建axios实例
const instance = axios.create({
  //基本请求路径的抽取
  //张成服务器
//   baseURL: 'http://www.xxkwnyzh.asia:8080/api',
  // baseURL: 'http://test.sharkxkd.asia:8081',
  //易金灿
  // baseURL: 'http://192.168.1.187:8081',
  //张成局域网
  baseURL: 'http://192.168.1.144:8081',
  //每次请求的过期时间，该请求20秒后被认为是失败的
      //张成热点
      // baseURL: 'http://192.168.151.227:8081',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data' // 设置请求头的Content-Type为'multipart/form-data'
  },
  body: {

  }
})

//请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    // 将token放入请求头中
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
)
//响应拦截器
instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
      // 对响应错误做点什么
      if(err.response.status === 401){
        //跳回到登录 reactRouter不支持在组件之外完成跳转
        //需要自己来实现
        window.location.href = '/'
        removeToken()
      }
      return Promise.reject(err)
  }
)

export default instance
