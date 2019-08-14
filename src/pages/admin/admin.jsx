import React, { Component } from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import {Layout} from 'antd'

import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const {Footer,Sider,Content} = Layout
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
            <Layout style={{height:'100%'}}>
              <Sider>
            <LeftNav/>
              </Sider>

              <Layout style={{height:'100%'}}>
                <Header/>
                <Content style ={{margin: 20, background:'#fff'}}>
                    <Switch>
                      <Route path='/home' component={Home}/>
                      <Route path='/category' component={Category}/>
                      <Route path='/product' component={Product}/>
                      <Route path='/role' component={Role}/>
                      <Route path='/user' component={User}/>
                      <Route path='/charts/bar' component={Bar}/>
                      <Route path='/charts/line' component={Line}/>
                      <Route path='/charts/pie' component={Pie}/>
                      <Redirect to='/home' />
                    </Switch>
                  </Content>
                <Footer style ={{textAlign:'center',color:'#aaa'}}>
                  推荐使用谷歌浏览器，可以获得更佳操作体验
                  </Footer>
              </Layout>
            </Layout>
          
        )
    }
}
