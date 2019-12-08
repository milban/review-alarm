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

import useUser from '../utils/useUser';
import ReviewResource from '../pages/ReviewResource';
import Header from './Header';

interface IRouteProps extends RouteProps {
  component: React.FC<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: IRouteProps) => {
  const [userData, isAuth, loading] = useUser();

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
    <Router forceRefresh={true}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/:userid" component={ReviewResource} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}
