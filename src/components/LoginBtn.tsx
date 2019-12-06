import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'rebass';
import useIsAuth from '../utils/useIsAuth';
import firebaseApp from '../firebase';

function LoginBtn() {
  const [isAuth, loading] = useIsAuth();
  let history = useHistory();
  const onClickLogout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        history.replace('/logout');
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (loading) {
    return <div>loading...</div>;
  } else {
    return isAuth ? (
      <Button onClick={onClickLogout}>Logout</Button>
    ) : (
      <Button>
        <Link to="/login">Login</Link>
      </Button>
    );
  }
}

export default LoginBtn;
