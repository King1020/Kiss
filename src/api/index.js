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

 //根据分类ID获取分类
 export const reqCategory = (categoryId) => ajax('/manage/product/info', {
   params:{
     categoryId
   }
 })

 //获取商品分页列表
 
 export const reqProducts = (pageNum, pageSize) => ajax.get('/manage/product/list', {
       params: { // 值是对象, 对象中包含的是query参数数据
         pageNum,
         pageSize
       }
     })

     //商品搜索
  export const reqSearch =({
  pageNum,
  pageSize,
  searchType, //搜索方式
  searchName, 
  })=>ajax({
    method:'GET',
    url: '/manage/product/search',
    params:{
      pageNum,
      pageSize,
     [searchType]: searchName
    }
  })
  
  // 更改商品状态
  export const reqUpdateSearch = (productId, status) => ajax({
      method: 'POST',
      url: '/manage/product/updateStatus',
      data: {
       productId,
       status
        }
  })
//根据商品ID获取商品
  export const reqPorduct = (productId) => ajax.get('/manage/product/info', {
    params:{
      productId
    }
  })

//删除图片
  export const reqDeleteImg = (name) => ajax.post('/manage/img/delete', {
    name
  })

//添加、更新商品
export const reqAddUpdateProduct = (product) => ajax.post(
  '/manage/product/'+ (product._id ? 'update':'add'),
 product
 )




  //获取所有角色的列表
  export const reqRoles = () => ajax(KING + '/manage/role/list')

  //添加角色
  export const reqAddRole = (roleName) => ajax.post(KING + '/manage/role/add',{
    roleName
  })

  //更新角色 给角色授权
  export const reqUpdateRole = (role) => ajax.post(KING + '/manage/role/update',{role})