import React, { Component } from 'react'
import {Card,List,Icon} from 'antd'
import ButtonLink from "../../components/button-link";
import memoryUtils from '../../utils/memoryUtils';
import { Kiss } from "../../utils/constants";
import { reqPorduct,reqCategory} from "../../api";
 const Item =List.Item
//商品管理的详情子路由
export default class ProdudtDetail extends Component {
  state={
    product:{},
    categoryName:''
  }

  getCategory = async (categoryId) => {
    const result = await reqCategory(categoryId)
    console.log('categoryId',categoryId)
    if (result.status === 0) {
      const categoryName = result.data
      this.setState({
        categoryName
      })
    }
  }
componentWillMount(){
    //从内存中读取porduct，如果有才更新
     const product = memoryUtils.product
     if(product._id){
       this.setState({
         product
       })
     }
  }
  async componentDidMount(){
    //状态中的product没有数据，就用param参数发送请求获取
    if(!this.state.product._id){
      const productId =  this.props.match.params.id
      const reslut = await reqPorduct(productId)
    if(reslut.status===0){
      const product = reslut.data
      //得到商品对象后获取分类
      this.getCategory(product.categoryId)
      this.setState({product})
    } 
   }else{
      const categoryId = this.state.product.categoryId
      this.getCategory(categoryId)
   }
  }
  render() {
    //读取状态数据
    const { product,categoryName} = this.state
   
    const title=(
      <span>
        <ButtonLink onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left'></Icon>
        </ButtonLink>
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className="product-detail" >
      <List>
        <Item>
            <span className="product-detail-left">商品名称:</span>
          <span>{product.name}</span>
        </Item>
          <Item>
            <span className="product-detail-left">商品描述:</span>
            <span>{product.desc}</span>
          </Item>
          <Item>
            <span className="product-detail-left">商品价格:</span>
            <span>{product.price}</span>
          </Item>
          <Item>
            <span className="product-detail-left">所属分类:</span>
            <span>
              {categoryName}
            </span>
          </Item>
          <Item>
            <span className="product-detail-left">商品图片:</span>
            <span>
              {
              product.imgs && product.imgs.map(img=>(
                  <img className="product-detail-img"key={img} src={Kiss + img} alt="" />

                ))
              }
            </span>
          </Item>

          <Item>
            <span className="product-detail-left">商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html:product.detail}}>  
            </span>
          </Item>
      </List>
     </Card>
    )
  }
}
