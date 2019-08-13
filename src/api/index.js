//包含 N个接口请求函数的模块，每个函数的返回值都是Promise对象

import ajax from './ajax'


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
