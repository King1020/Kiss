import  './login.less'
import logo from'./images/logo.png'
import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
const Item = Form.Item
// 登录路由
 class Login extends Component {
    //阻止事件默认行为(提交表单)
    handleSubmit = e => {
        e.preventDefault();
        // e.stop停止事件冒泡
        // alert('发送ajax请求')
       const values = this.props.form.getFieldsValue()
       const username = this.props.form.getFieldValue('username')
       const password = this.props.form.getFieldValue('password')
       console.log(values,username,password)
      };

    render() {
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
           rules: [//声明是验证:或插件已定义好的规则 进行验证
               {required: true, message:'请输入用户名' },
               { whitespace:true,message:'用户名不能为空'},
               {min:4,message:'用户名不能少于四位'},
               {max:12,message:'用户名不能大于十二位'},
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
           rules: [
               { required: true, message: '请输入密码' },
               {min:6,message:'用户名不能少于六位'},
               {max:12,message:'用户名不能大于十二位'},
            ],
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