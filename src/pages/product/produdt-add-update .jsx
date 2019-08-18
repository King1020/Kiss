import React, { Component } from 'react'
import { Card, Form, Input, Select, Button ,Icon,} from "antd";
import ButtonLink from '../../components/button-link'
import PicturesWall from './pictures-wall'
import { reqCategorys,reqAddUpdateProduct } from '../../api'
import  RichTextEditor from './rich-text-editor'
import { message } from "antd";

const Item = Form.Item
const Option = Select.Option

 class ProdudtAddUpdate  extends Component {
   // 
    state={
      categorys:[]
    }
    
    constructor(props){
      super(props)
      //ref容器
     this.pwRef =  React.createRef()
     this.editorRef =  React.createRef()
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
    this.props.form.validateFields(async(error,values)=>{
      if(!error){
        const {name,desc,price,categoryId}=values
        console.log(name, desc, price, categoryId)

        //得到所有上传图片文件名的数组
        const imgs = this.pwRef.current.getImgs()
          
       //得到富文本编辑器指定的detail
       const detail = this.editorRef.current.getDetail() 
       
       //准备product
       const product = {name, desc, price, categoryId,imgs,detail}
      if(this.product._id){
        product._id =this.product._id  


      }
       //发添加商品请求
       
       // 法修改商品请求
      const  result =await reqAddUpdateProduct(product)
      if(result.status===0){
        message.success('商品修改成功')
        this.props.history.replace('/product')
      }else{
        message.error('商品操作失败')
      }
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
                <Input type='number' placeholder='商品价格' addonAfter='元'></Input>
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
          
          <Item label="商品图片" wrapperCol={{ span: 14}}>
            {/* 内部会将组件对象保存到ref容器对象：current：组件对象 */}
            <PicturesWall ref={this.pwRef} imgs={product.imgs}/>
  
          </Item>
          
          <Item label="商品详情" wrapperCol={{ span: 20 }}>
            <RichTextEditor ref={this.editorRef} imgs={product.detail}/>

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