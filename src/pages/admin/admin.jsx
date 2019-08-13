import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils';
import { from } from 'rxjs';
// 后台管理路由组件
export default class Admin extends Component {
    render() {
     const user =  memoryUtils.user
     //检查用户是否登录，没有就自动跳转到登录页面
     if(!user._id){
    //在render中自动跳转
   return <Redirect to="/Login"/> 
    }
        return (
            <div>
                Hello {user.username}
            </div>
        )
    }
}
