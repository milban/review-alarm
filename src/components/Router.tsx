import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';

import useIsAuth from '../utils/useIsAuth';
import Protected from '../pages/Protected';

interface IRouteProps extends RouteProps {
  component: React.FC<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: IRouteProps) => {
  const [isAuth, loading] = useIsAuth();

  if (loading) {
    return <div>LOADING...</div>;
  } else {
    return (
      <Route
        {...rest}
        render={props =>
          isAuth ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
};

export default function() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Protected} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}
