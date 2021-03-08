import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { setProtection } from '../redux/actions/setProtectionAction';

const ProtectedRoute = ({ component: Component, isLoggedin, seen, ...rest }) => {
  const dispatch = useDispatch()
  return (
    <Route {...rest} render={
      props => {
        if (isLoggedin) {
          dispatch(setProtection(seen))
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/login',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;
