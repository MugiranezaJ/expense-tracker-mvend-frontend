import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom'
import { createBrowserHistory } from 'history';
import Landing from '../components/views/landingPage';
import CreateCategory from '../components/views/createCategory';
import ListCategory from '../components/views/listCategory';
import CreateExpense from '../components/views/createExpense';
import ListExpense from '../components/views/listExpense';
import Login from '../components/views/login'
import NavBar from '../components/layout/navbar'
import Footer from '../components/layout/footer'
import { checkToken, protectRouted } from '../services/protectRoute';
import ProtectedRoute from '../protectedRoutes';

const history = createBrowserHistory()
export default function InternalRoutes(){
    const[isProtected, setIsProtected] = useState(false);
    useEffect(() => {
        setIsProtected(checkToken())
        // protectRouted().then(result => {
        //     setIsProtected(result)
        // }).catch(err => {
        //     setIsProtected(err)
        // })
    }, []);

    return(
        <Router history={history}>  
            <NavBar />
            <Switch>
               <ProtectedRoute exact path='/' isLoggedin={checkToken()}  seen={true} component={Landing} />
               <ProtectedRoute path='/category/create' isLoggedin={checkToken()} seen={true} component={CreateCategory}/>
               <ProtectedRoute path='/category/view' isLoggedin={checkToken()} seen={true} component={ListCategory}/>
               <ProtectedRoute path="/expense/create" isLoggedin={checkToken()} seen={true} component={CreateExpense} />
               <ProtectedRoute path="/expense/view" isLoggedin={checkToken()} seen={true} component={ListExpense} />
               <Route path="/login" component={Login} />
               <Redirect to="/PageNotFound" />
            </Switch>
            <Footer />
        </Router>
    )
}