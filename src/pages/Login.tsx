import React from 'react';
import firebase from 'firebase';
import { Button } from 'rebass';
import { useHistory } from 'react-router-dom';
import { db, storage } from '../firebase';

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
          .doc(email!)
          .get()
          .then(doc => {
            if (doc.exists) {
              console.log('aleady signed user');
              history.push('/');
            } else {
              console.log('not aleady signed user');
              db.collection('users')
                .doc(email!)
                .set({ uid, displayName, email, photoURL })
                .then(() => {
                  // storage.ref(email!).child('yourfirst')
                  history.push('/');
                });
            }
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
