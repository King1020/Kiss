import React, { Component } from 'react'
import { Card, Button, Icon, Table, Modal, message,} from "antd";
//添加 修改 分类
import {reqCategorys,reqAddCategory } from "../../api";
import ButtonLink  from "../../components/button-link";
import CategoryFrom  from "./category-from";


/**
 * 分类管理
 */
export default class Category extends Component {
    state = {
      categorys:[],
      loading:false,
      showStatus:0,// 0: 都不显示 1:显示添加 2：显示修改
    }

//异步请求数据
  getcategorys = async () => {
    //显示loading
    this.setState({ loading: true })
    const result = await reqCategorys()
     //隐藏loading
    this.setState({loading: false})
    if (result.status === 0) {//请求成功
      //取出分类列表
      const categorys = result.data
      //更新状态categorys
      this.setState({ categorys})
    }
  }
  //初始化Tabel所有列的数组
  initColums = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',

      },
      {
        width: 300,
        title: '操作',
        render: (category) => (
          <ButtonLink 
            onClick={()=> {
              //保存cat
              this.category = category
              //更新对话框

              this.setState({ showStatus: 2 })
              }}>
            修改分类
          </ButtonLink>
        )
      }
    ];
  }
  //更新分类
  updateCategory = () =>{

  }
  //添加分类
  addCategory = () =>{
    // 1. 进行表单验证
    this.form.validateFields(async (error, values) => {
      if (!error) { // 验证通过了

        // 重置输入框的值(变为初始值)
        this.form.resetFields()

        // 隐藏添加界面
        this.setState({
          showStatus: 0
        })

        // 2. 收集数据
        const categoryName = values.categoryName

        // 3. 发请求添加
        const result = await reqAddCategory(categoryName)
        // 4. 根据请求结果做不同处理
        if (result.status === 0) {
          message.success('添加分类成功')
          // 显示最新列表
          this.getCategorys()
        } else {
          message.error('添加失败: ' + result.msg)
        }
      }
    })
  }

  //隐藏对话框
  handleCancel =() =>{
    this.setState({
      showStatus:0
    })
  }
  //接收Form保存的函数
  setForm =(form)=>{
    this.form = form
  }

  componentWillMount(){
    this.initColums()
  }
  componentDidMount(){
    this.getcategorys()
  }
  render() { 

    //取出状态数据
    const { categorys, loading,showStatus} = this.state
    //取出当前需要的category
    const category = this.category || {}

    const extra =(
      <Button type="primary" onClick={()=>this.setState({showStatus:1})} >
        <Icon type="plus"/>
        添加
      </Button>
    )
    return (
      <Card extra={extra}>
        <Table 
        bordered
        rowKey="_id"
        loading= {loading}
        dataSource={categorys}
        columns={this.columns}   
        pagination={{pageSize:5,showQuickJumper:true}}    
         />;

         <Modal
          title="修改分类"
          visible={showStatus===2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <CategoryFrom categoryName={category.name}/>
        </Modal>
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <CategoryFrom setForm={this.setForm}/>
        </Modal>
      </Card>
    )
  }
}
