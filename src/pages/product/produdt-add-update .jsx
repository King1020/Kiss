import React, { Component } from 'react'
import { Card, Form, Input, Select, Button ,Icon,} from "antd";
import ButtonLink from '../../components/button-link'
import { reqCategorys } from '../../api'
const Item = Form.Item
const Option = Select.Option

 class ProdudtAddUpdate  extends Component {
   // 
    state={
      categorys:[]
    }

    //异步获取所有分组显示
   getCategorys = async() =>{
     const result = await reqCategorys()
     if(result.status===0){
       this.setState({
         categorys:result.data
       })
     }
   }

   //检查价格
   validatorPrice = (rule,value,callback) => {
     if (value < 0 ) {
       callback('价格不能小于零')
     }else{
       callback()
     }
   }
 //提交按钮的响应回调
   handlSubmit =(event)=>{
    //阻止事件默认行为
    event.preventDefault()
    this.props.form.validateFields((error,values)=>{
      if(!error){
        const {name,desc,price,categoryId}=values
        
      }
    })
   }

   componentDidMount(){
     this.getCategorys()
   }
   componentWillMount () {
    const product = this.props.location.state
  
    this.product = product || {}
    this.isUpdate = !!this.product._id
   }
  render() {
    const { product, isUpdate} = this
    
    const { categorys} = this.state
    const { getFieldDecorator} =this.props.form
    const title = (
      <span>
        <ButtonLink onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"></Icon>
        </ButtonLink>
        <span>{isUpdate?'更新':'添加'}商品</span>
      </span>
    )
//表单布局

    const FormItem ={
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    }

    return (
     <Card title={title}>
       <Form {...FormItem } onSubmit={this.handlSubmit}>
        
          <Item label="商品名称">
         {
              getFieldDecorator('name',{
                initialValue: product.name,
                rules:[
                  {required:true,message:'商品名称不能为空'}
                ]
              })(
                <Input type='text' placeholder='商品名称'></Input>
              )
         }
         </Item>

          <Item label="商品描述">
            {
              getFieldDecorator('desc', {
                initialValue: product.desc,
                rules: [
                  { required: true, message: '商品描述不能为空' }
                ]
              })(
                <Input type='text' placeholder='商品描述'></Input>
              )
            }
          </Item>
        
          <Item label="商品价格">
            {
              getFieldDecorator('price', {
                initialValue: product.price,
                rules: [
                  { required: true, message: '商品价格不能为零' },
                  {validator:this.validatorPrice}
                ]
              })(
                <Input type='numder' placeholder='商品价格' addonAfter='元'></Input>
              )
            }
          </Item>

          <Item label="商品分类">
            {
              getFieldDecorator('categoryId', {
                initialValue: product.categoryId,
                rules: [
                  { required: true, message: '商品分类不能为空' }
                ]
              })(
                    <Select>
                  <Option value="">未选择</Option>
                  {
                    categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                  }
                </Select>
              )
            }
          </Item>
          
          <Item>
           <Button type='primary' htmlType='submit'>提交</Button>
          </Item>
       </Form>
     </Card>
    )
  }
}

export default Form.create()(ProdudtAddUpdate)