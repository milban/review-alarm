import { useState } from 'react';
import firebaseApp from '../firebase';
import firebase from 'firebase';

function useUser(): [firebase.User | undefined, boolean, boolean] {
  const [userData, setUserData] = useState<firebase.User | undefined>();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
      setIsAuth(true);
      setUserData(user);
    }
    setLoading(false);
  });
  return [userData, isAuth, loading];
}

export default useUser;
