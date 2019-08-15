import React, { Component } from 'react'
import { Switch,Route ,Redirect} from "react-router-dom"
import  ProdudtHome  from "./produdt-home";
import  ProdudtDetail  from "./produdt-detail";
import  ProdudtAddUpdate  from "./produdt-add-update ";
/**
 * 商品管理
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" component={ProdudtHome} exact/>
        <Route path="/product/detail/:id" component={ProdudtDetail}/>
        <Route path="/product/addupdate" component={ProdudtAddUpdate}/>
        <Redirect to="/product"/>
      </Switch>
    )
  }
}
