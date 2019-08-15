import React, { Component } from 'react'
import { Form,Input } from "antd";
import PropTypes from 'prop-types'

const { Item}  = Form
//分类添加
 class CategoryFrom extends Component {
   //类（函数对象）对象
  static propTypes ={
    categoryName: PropTypes.string,
    setForm: PropTypes.func.isRequired
  }
   render() {
     const { categoryName } = this.props
     const { getFieldDecorator } = this.props.form
     return (
       <Form>
         <Item>
           {
             getFieldDecorator('categoryName', {
               initialValue: categoryName || '',
               rules: [
                 { required: true, message: '分类名称不能为空' }
               ]
             })(
               <Input type="text" placeholder="分类名称" />
             )
           }
         </Item>
       </Form>
     )
   }
 }

export default Form.create()(CategoryFrom)