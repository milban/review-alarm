import React from 'react';
import LoginBtn from '../components/LoginBtn';
import { Heading, Button } from 'rebass';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import useUser from '../utils/useUser';

export default () => {
  let isLoginPage = useRouteMatch('/login');
  const [userData, isAuth, loading] = useUser();
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '1rem',
      }}
    >
      <Heading>
        <Link to="/">리뷰 알람</Link>
      </Heading>
      <div>
        {userData && (
          <Button mr={2}>
            <Link to={`/${userData!.email!.split('@')[0]}`}>To Contents</Link>
          </Button>
        )}
        {!isLoginPage && <LoginBtn />}
      </div>
    </header>
  );
};
