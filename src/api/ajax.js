//发送ajax请求的函数模块
//1.post请求的date对象数据转换成 urlenconde格式的字符串数据
//2.请求成功得到的不是response，而是response.data
//3.统一处理请求异常
import axios from  'axios'
import {message} from 'antd'
import qs from 'qs'

//使用请求拦截器
axios.interceptors.request.use(config => {
    //转换urlenconde格式的字符串数据
   if(config.method.toLocaleUpperCase() ==='POST' && config.data instanceof Object){
       config.data = qs.stringify(config.data)
   }
    return config
})
//使用响应拦截器 
axios.interceptors.response.use(
    response => {
        return response.data
    },
 //统一处理请求异常
   error => {
       message.error('请求失败:'+ error.message)
       //返回一个peding状态的promise ==》中断promise链
        return new Promise(() => {})
    }
)
export default axios