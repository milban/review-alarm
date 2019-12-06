import React from 'react';
import firebase from 'firebase';
import { Button } from 'rebass';
import { useHistory } from 'react-router-dom';
import { db } from '../firebase';

function Login() {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  const scopes = ['email', 'profile'];
  scopes.forEach(scope => googleAuthProvider.addScope(scope));

  let history = useHistory();

  const onClickGoogleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(result => {
        const { displayName, email, photoURL, uid } = result.user!;
        db.collection('users')
          .doc(uid)
          .set({ displayName, email, photoURL })
          .then(() => {
            history.push('/');
          });
      })
      .catch(error => {
        console.log('google login 실패', error);
        history.push('/login');
      });
  };
  return (
    <div>
      <Button onClick={onClickGoogleLogin}>Google Login</Button>
    </div>
  );
}

export default Login;
