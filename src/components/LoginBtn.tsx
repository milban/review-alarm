import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'rebass';
import useUser from '../utils/useUser';
import firebaseApp from '../firebase';

function LoginBtn() {
  const [userData, isAuth, loading] = useUser();
  let history = useHistory();
  const onClickLogout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        history.push('/');
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
