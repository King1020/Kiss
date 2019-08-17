import React, { Component } from 'react'
import ButtonLink from '../../components/button-link' 
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import { formateDate } from "../../utils/dateUtils"
import AddForm from './add-from'
import { reqRoles ,reqAddRole} from "../../api";
 

  //保存要设置权限的roles
// showAuth = (role) => {
//   this.role =role
//   this.setState({
//     isShowAdd:true
//   })
// }
/**
 * 角色管理
 */
export default class Role extends Component {
  //初始化
  state = {
    roles: [],
    isShowAdd: false,
    isShowAuth: false
  }
  initColumns = () => {
    this.columns=[
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
      {
        title: '操作',
        render: (role) => <ButtonLink onClick={() => this.showAuth(role)}>设置权限</ButtonLink>
      }
    ]
  }
  //显示角色列表
  getRoles = async () => {
   const result = await reqRoles()
   if(result.status===0){
     const roles = result.data
     this.setState({roles})
   }
  }
//添加角色
  addRole =()=>{
    this.form.validateFields(async(error,values)=>{
      if(!error){
        this.setState({isShowAdd:false})//隐藏添加框
        const {roleName} =values
        const result = await reqAddRole(roleName)
        if(result.status===0){
          message.success('添加角色成功')
          this.form.resetFields()//重置输入框
          this.getRoles()//重新获取列表显示
        }
      }
    })
  }
  componentWillMount(){
    this.initColumns()
  }
  componentDidMount(){
   this.getRoles()
  }
  render() {
    const { roles,isShowAdd} =this.state
    const title =<Button type="primary" onClick={()=>this.setState({isShowAdd:true})} >创建角色</Button>
    return (
     <Card title={title}>
       <Table 
       bordered
       rowKey = "_id"
       dataSource = {roles}
       columns = {this.columns}
       />  
        <Modal
        visible = {isShowAdd}
        title ='添加角色'
        onOk ={this.addRole}
        onCancel={()=>{
          this.form.resetFields()//重置输入框内容
          this.setState({ isShowAdd: false })
        }}
        >
          <AddForm setForm={(form)=>this.form = form}/>
        </Modal>
       
     </Card>
    )
  }
}
