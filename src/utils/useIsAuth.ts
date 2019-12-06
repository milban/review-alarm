import { useState } from 'react';
import firebaseApp from '../firebase';

function useIsAuth(): boolean[] {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
      setIsAuth(true);
    }
    setLoading(false);
  });
  return [isAuth, loading];
}

export default useIsAuth;
