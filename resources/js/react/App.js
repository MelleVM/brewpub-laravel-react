import React from "react"
import Header from "./components/Header"
import {Route, Switch, Redirect} from "react-router-dom"
import WaiterIndex from "./pages/orders/waiter/Index"
import WaiterCreate from "./pages/orders/waiter/Create"
import WaiterEdit from "./pages/orders/waiter/Edit"
import BartenderIndex from "./pages/orders/bartender/Index"
import CustomerIndex from "./pages/orders/customer/Index"
import CustomerCreate from "./pages/orders/customer/Create"

import {
  ToastContainer
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    return (
        <>
            <ToastContainer />
            <Header />
            
            <Switch>
               <Route exact path="/orders/waiter">
                   <WaiterIndex />
               </Route> 
               <Route exact path="/orders/waiter/create/:tableId">
                   <WaiterCreate />
               </Route> 
               <Route exact path="/orders/waiter/edit/:orderId">
                   <WaiterEdit />
               </Route> 
               <Route exact path="/orders/bartender">
                   <BartenderIndex />
               </Route> 
               <Route exact path="/orders/customer">
                   <CustomerIndex />
               </Route> 
               <Route exact path="/orders/customer/:tableId">
                   <CustomerIndex />
               </Route> 
               <Route exact path="/orders/customer/create/:tableId">
                   <CustomerCreate />
               </Route> 
               <Route path="/">
                   <Redirect to="/orders/waiter" />
               </Route> 
            </Switch>
        </>
    ) 
}

export default App
