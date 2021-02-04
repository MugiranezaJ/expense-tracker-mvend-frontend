import React from 'react';
import Landing from '../components/landingPage';
import { Switch, Redirect } from 'react-router-dom';
import RouteWithLayout  from '../components/RouteWithLayout';
import DefaultLayout from '../components/layout';
import { CreateCategory } from '../components/createCategory';
import ListCategory from '../components/listCategory';
import { CreateExpense } from '../components/createExpense';
import ListExpense from '../components/listExpense';

const Routes = () => {
    return (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/welcome"
        />
        <RouteWithLayout
          component={Landing}
          exact
          layout={DefaultLayout}
          path="/welcome"
        />
        <RouteWithLayout
          component={CreateCategory}
          exact
          layout={DefaultLayout}
          path="/category/create"
        />
        <RouteWithLayout
          component={ListCategory}
          exact
          layout={DefaultLayout}
          path="/category/view"
        />
        <RouteWithLayout
          component={CreateExpense}
          exact
          layout={DefaultLayout}
          path="/expense/create"
        />
        <RouteWithLayout
          component={ListExpense}
          exact
          layout={DefaultLayout}
          path="/expense/view"
        />
        
        <Redirect to="/PageNotFound" />
      </Switch>
    );
  };
  
  export default Routes;