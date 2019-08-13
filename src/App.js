import React, { Component } from 'react'
import {HashRouter,BrowserRouter,Route,Switch} from 'react-router-dom'
import Admin from './pages/admin/admin.jsx'
import Login from './pages/login/login.jsx'

 export default class App extends Component {
    render() {
        return (
         <BrowserRouter>
             <Switch>
                 <Route path="/login" component={Login}/>
                 <Route path="/" component={Admin}/>
             </Switch>
         </BrowserRouter>
       
        )
    }
}
