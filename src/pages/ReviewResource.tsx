import React, { useState, useEffect, MouseEvent } from 'react';
import WYSIWYG from '../components/WYSIWYG';
import useUser from '../utils/useUser';
import { storage } from '../firebase';
import { BoxProps, Button, Flex } from 'rebass';

const Container = ({ children, ...rest }: BoxProps) => (
  <Flex {...rest} padding="1rem" height="100%" fontSize={[2, 3, 4]}>
    {children}
  </Flex>
);

function ReviewResource() {
  const [userData, isAuth, loading] = useUser();
  const [contentsList, setContentsList] = useState<string[]>([]);
  const [currentContentTitle, setCurrentContentTitle] = useState('');

  useEffect(() => {
    const getContentsList = async () => {
      const email = userData!.email!;
      const { items } = await storage
        .ref('review_contents')
        .child(email)
        .list();
      const contentTitles = items.map(item => item.name);
      console.log(contentTitles);
      setContentsList(contentTitles);
    };
    if (!loading) {
      getContentsList();
    }
  }, [loading]);

  useEffect(() => {
    if (contentsList.length !== 0) {
      setCurrentContentTitle(contentsList[0]);
    }
  }, [contentsList]);

  const getContent = (e: MouseEvent) => {
    setCurrentContentTitle((e.target as Element).textContent!);
  };

  const createContent = () => {};

  if (loading) {
    return <div>LOADING...</div>;
  } else {
    return (
      <Container>
        <nav
          style={{
            display: 'flex',
            height: '90vh',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '1rem',
            borderRight: '1px solid rgba(0, 0, 0, 0.2)',
            overflow: 'scrollY',
          }}
          onClick={getContent}
        >
          <Button onClick={createContent}>New content</Button>
          {contentsList.map((content, idx) => (
            <Button key={idx} variant="flat">
              {content}
            </Button>
          ))}
        </nav>
        {currentContentTitle !== '' && (
          <WYSIWYG userData={userData!} contentTitle={currentContentTitle} />
        )}
      </Container>
    );
  }
}

export default ReviewResource;
