import React, { Component } from 'react'
import { Modal } from 'antd';
import {withRouter} from 'react-router-dom'
import {funTime} from '../../utils/dateUtils'
import { removeUser} from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import menuConfig from '../../config/menuConfig'
import {reqWeather} from '../../api/'
import ButtonLink from '../button-link/index'
import './index.less'


 class Header extends Component {
    //初始化
    state = {
        currentTime:funTime(Date.now()),
        dayPictureUrl:'',
        Weater:''
    }
      // 启动循环定时器, 每隔1s更新时间
      upTime = () => {
        setInterval(() => {
          const currentTime = funTime(Date.now())
          this.setState({
            currentTime
          })
        }, 1000);
      }
      //获取天气显示
      getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather('北京')
        this.setState({
          dayPictureUrl,
            weather
        })
      }
      //得到当前请求页面对应标题
      getTitle = () => {
        let title = ''
        const path = this.props.location.pathname
        menuConfig.forEach(item => {
          if (item.key===path) {
            title = item.title
          } else if (item.children) {
            const cItem = item.children.find(cItem => cItem.key===path)
            if (cItem) {
              title = cItem.title
            }
          }
        })
    
        return title
      }
      //退出登录
   logout =() => {
     Modal.confirm({//配置对象
       title: '确认退出登录嘛?',
       onOk:()=> {
         //删除保存的user
         removeUser()
         memoryUtils.user= {}
         //跳转到login
        this.props.history.replace('/login')
       },
       onCancel() {
         console.log('Cancel');
       },
     })
   }
   componentDidMount() {
     this.upTime()
     this.getWeather()
   }
    render() {
        const { currentTime, dayPictureUrl, weather} =this.state
        const {user} = memoryUtils
        //根据页面显示不同标题
        const title =this.getTitle()
        return (
            <div className="header">
               <div className="header-top">
                   <span>欢迎,{user.username} </span>
                   <ButtonLink onClick={this.logout}>
                    退出登录
                   </ButtonLink>
               </div>
               <div className="header-bottom">
                   <div className='header-bottom-left'>{title}</div>
                   <div className='header-bottom-right'>
                   <span>{currentTime}</span>
                   {dayPictureUrl ? <img src={dayPictureUrl} alt="Weater" /> : null}
                   <span>{weather}</span>
                   </div>
               </div>
            
            </div>
        )
    }
}
   export default withRouter(Header)