import  './login.less'
import logo from'../../assets/imags/logo.png'
import React, { Component } from 'react'
import { Form, Icon, Input, Button,message } from 'antd';
import {reqLogin} from '../../api/'
import memoryUtils from '../../utils/memoryUtils';
import {Redirect} from 'react-router-dom';
import {saveUser} from '../../utils/storageUtils'
import { from } from 'rxjs';
const Item = Form.Item
// 登录路由
 class Login extends Component {
    //阻止事件默认行为(提交表单)
    handleSubmit = e => {
        e.preventDefault();
        // e.stop停止事件冒泡
        //表单的统一验证方法
        this.props.form.validateFields(async (err,values)=>{
          if(!err){//校验成功
          const result = await reqLogin(values)
          if(result.status===0){//登录成功
              //得到user
            const user = result.data
            //保存user
            //保存到local
           //localStorage.setItem('user_key',JSON.stringify(user))
            saveUser(user)
            //保存到内存中
            memoryUtils.user = user
              //跳转到admin
            this.props.history.replace('/')
          }else{//登录失败
                message.error(result.msg)
          }
          }
        })
      };
      //自定义密码验证
      validatePwd = (rule,value,callback) =>{
          if(!value){
            callback('密码不能为空')
          }else if(value.length<4){
            callback('密码不少于4位')
          }else if(value.length>12){
            callback('密码不能大于12位')
          }else if(!/[a-zA-Z0-9_]+$/){
            callback('密码必须是英文、数字或下划线组成')
          }else{
            callback()//验证通过
          }
      }
 
    render() {
      //当前用户已登录，自动跳转admin
      if(memoryUtils.user._id){
        return <Redirect to="/"/> 
      }
        const {getFieldDecorator} =this.props.form

        return (
            <div className="login">
                <div className="login-heander">
                   <img src={logo} alt=""/>
                    <h1>后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h1>用户登录</h1>
         <Form onSubmit={this.handleSubmit} className="login-form">
         <Item>
         {getFieldDecorator('username', {
              initialValue:'',
           rules: [//声明是验证:或插件已定义好的规则 进行验证
               {required: true,whitespace:true, message:'请输入用户名' },
               {min:4,message:'用户名不能少于4位'},
               {max:12,message:'用户名不能大于12位'},
               {pattern:/[a-zA-Z0-9_]+$/,message:'用户名必须是英文,数字,下划线组成'}
            
            ],
          })(
            <Input
              prefix={<Icon type="user"/>}
              placeholder="用户名"
            />,
          )}
         
        </Item>
        <Form.Item>
        {getFieldDecorator('password', {//配置对象:属性名是一些特定名称 options
             initialValue:'',
            rules:[//自定义验证
              {validator:this.validatePwd}
            ]
          })(
            <Input
              prefix={<Icon type="lock"/>}
              type='password'
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登  录
          </Button>
        </Form.Item>
      </Form>
    </div>
 </div>
        )
    }
}
const WrappedLoginForm = Form.create()(Login);//组件名


export default WrappedLoginForm