import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  const user = localStorage.getItem('user');

  return (
    <Route {...rest} render={props => {
        console.log(props.location);
        if (user == null) {
          return <Redirect to={{ pathname: '/register', state: { from: props.location } }} />
        }
        return <Component {...props} />
      }}
    />
  )
}

export default PrivateRoute