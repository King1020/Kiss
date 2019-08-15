//包含 N个接口请求函数的模块，每个函数的返回值都是Promise对象

import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

// const KING = 'http://localhost:5000'
const KING = ''

//登录
export const reqLogin =({username,password}) => ajax.post(KING +'/login',{username,password})

//添加用户
export const reqAddUser = (user) => ajax({
    url: KING +'/manage/user/add',
    method:'POST',
    data:user

})

//获取天气(jsonp)

export const reqWeather =(city)=>{
    const url =`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`

    return new Promise((resolve, reject) => {//执行器函数
        jsonp(url, {}, (err, data) => {
          if (!err && data.error === 0) {
            const {dayPictureUrl, weather} = data.results[0].weather_data[0]
            resolve({dayPictureUrl, weather})
          } else {
            message.error('获取天气信息失败!')
          }
        })
      })
}
//获取所有商品分类列表
export const reqCategorys = () => ajax.get('/manage/category/list')

 //添加分类
  export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add',{categoryName})



  //修改分类 
 export const reqUpCategory = (categoryName, categoryId) => ajax.post('/manage/category/add', {
   categoryName,
   categoryId
 })