import React, { Component } from 'react'
import {Link,withRouter} from "react-router-dom"
import { Menu, Icon } from 'antd'

import logo from '../../assets/imags/logo.png'
import './index.less'
import menuConfig from '../../config/menuConfig';
const { SubMenu,Item } = Menu;

//admin的左侧导航
 class LeftNav extends Component {
    /*
  根据菜单数据数组返回标签(Item/SubMenu)数组
  map + 递归
  */
  getMenNodes = (menuConfig) => {
    const path = this.props.location.pathname
      return menuConfig.map((item)=>{
          //返回item
          if(!item.children){
              return (
          <Item key={item.key}>
            <Link to={item.key}>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
            </Link>
          </Item> 
              )
          }else{
            
            //当前item的children中某个item的key与当前请求的path相同，当前item的key就是openkey。
            const cItem = item.children.find((cItem) => path.indexOf(cItem.key) === 0)
            if (cItem) {
              //保存openkey
            this.openKey = item.key
          }
            
            //返回SubMenu
        return (
         <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </span>
            }
          >
          {
            this.getMenNodes(item.children)
          }
          </SubMenu>
            )
          }       
      })
  }
  //在第一次render()之前执行
  //同步执行
  //第一次就需要render()
   componentWillMount(){
   this.MenNodes = this.getMenNodes(menuConfig)
   } 
//在第一次render()之后执行
// 异步操作(ajax请求，启动定时器。。。)
//第一次render()用不到
   componentDidMount(){

   }
    render() {
      //得到请求的路由路径
      let path = this.props.location.pathname
      if (path.indexOf('./produdt') === 0){
        path = './produdt'
      }
      
      console.log(this.openkey)
        return (
            <div className="left-nav">
              <Link to="/home" className="left-nav-header">
                  <img  src={logo} alt="logo"/>
                    <h2>后台管理</h2>
              </Link>
            {/* 左侧导航 */}
            <Menu 
            theme="dark"
            mode="inline"
          //defaultSelectedKeys={[path]}//只有第一次指定的值有效 
              selectedKeys={[path]}
          //自动默认打开选中子菜单的父菜单
              defaultOpenKeys={[this.openKey]}
          
          >
            {
                this.MenNodes
            }
        </Menu>
     </div>
        )
    }
}
//高阶组件包装一个组件生成一个新的组件
//新组件会向 LeftNav 组件传递3个属性：history/location/match
export default withRouter(LeftNav)