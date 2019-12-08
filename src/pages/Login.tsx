import React from 'react';
import firebase from 'firebase';
import { Button, Card } from 'rebass';
import { useHistory } from 'react-router-dom';
import { db, storage } from '../firebase';
import uniqueId from '../utils/uniqueId';

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
        const userId = email!.split('@')[0];
        db.collection('users')
          .doc(email!)
          .get()
          .then(doc => {
            if (doc.exists) {
              console.log('aleady signed user');
              history.push(`/${userId}`);
            } else {
              console.log('not aleady signed user');
              db.collection('users')
                .doc(email!)
                .set({
                  uid,
                  displayName,
                  email,
                  photoURL,
                })
                .then(() => {
                  const contentUid = uniqueId();
                  db.collection('users')
                    .doc(email!)
                    .collection('contents')
                    .doc(contentUid)
                    .set({ title: 'your first content' })
                    .then(() => {
                      storage
                        .ref('review_contents')
                        .child(`${email}/${contentUid}`)
                        .putString('')
                        .then(() => {
                          history.push(`/${userId}`);
                        });
                    });
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
    <div
      style={{
        width: '100%',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          width: '200px',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button onClick={onClickGoogleLogin}>Google Login</Button>
      </Card>
    </div>
  );
}

export default Login;
