import React, { Component } from 'react'
import { Card,Button,Icon,Table } from "antd";
//添加 修改 分类
import {reqCategorys,reqAddCategory,reqUpCategory  } from "../../api";
import ButtonLink  from "../../components/button-link";



/**
 * 分类管理
 */
export default class Category extends Component {
    state = {
      categorys:[],
      loading:false
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
        render: () => <ButtonLink>修改分类</ButtonLink>
      }
    ];
  }
  componentWillMount(){
    this.initColums()
  }
  componentDidMount(){
    this.getcategorys()
  }
  render() { 

    //取出状态数据
    const { categorys, loading} = this.state

    const extra =(
      <Button type="primary" >
        <Icon type="plus"/>
        添加
      </Button>
    )
    return (
      <Card extra={extra}>
        <Table 
        bordered

        loading= {loading}
        dataSource={categorys}
        columns={this.columns}   
        pagination={{pageSize:5,showQuickJumper:true}}  
            
         />;
      </Card>
    )
  }
}
