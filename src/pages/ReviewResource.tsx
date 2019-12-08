import React, { useState, useEffect, MouseEvent } from 'react';
import WYSIWYG from '../components/WYSIWYG';
import useUser from '../utils/useUser';
import { storage, db } from '../firebase';
import { BoxProps, Button, Flex } from 'rebass';
import uniqueId from '../utils/uniqueId';

const Container = ({ children, ...rest }: BoxProps) => (
  <Flex {...rest} padding="1rem" height="100%" fontSize={[2, 3, 4]}>
    {children}
  </Flex>
);

function ReviewResource() {
  const [userData, isAuth, loading] = useUser();
  const [contentIdList, setContentIdList] = useState<string[]>([]);
  const [contentTitleList, setContentTitleList] = useState<string[]>([]);
  const [contentList, setContentList] = useState<Map<string, string>>(
    new Map(),
  );
  const [currentContentId, setCurrentContentId] = useState('');

  const getContentsList = async () => {
    const email = userData!.email!;
    const { items } = await storage
      .ref('review_contents')
      .child(email)
      .list();
    const contentIds = items.map(item => item.name);
    setContentIdList(contentIds);

    db.collection('users')
      .doc(email)
      .collection('contents')
      .get()
      .then(snapshot => {
        const tmpContentList: Map<string, string> = new Map();
        snapshot.forEach(doc => {
          tmpContentList.set(doc.id, doc.data().title);
        });
        setContentList(tmpContentList);
      });
  };

  useEffect(() => {
    if (contentList.size !== 0) {
      const tmpTitleList: string[] = [];
      contentList.forEach((value, key) => {
        tmpTitleList.push(value);
      });
      setContentTitleList(tmpTitleList);
    }
  }, [contentList]);

  useEffect(() => {
    if (!loading) {
      getContentsList();
    }
  }, [loading]);

  useEffect(() => {
    if (contentIdList.length !== 0) {
      setCurrentContentId(contentIdList[0]);
    }
  }, [contentIdList]);

  const getContent = (e: MouseEvent) => {
    const targetTitle = (e.target as Element).textContent!;
    contentList.forEach((value, key) => {
      if (value === targetTitle) {
        setCurrentContentId(key);
      }
    });
  };

  const createContent = () => {
    const email = userData!.email!;
    const contentUid = uniqueId();
    storage
      .ref('review_contents')
      .child(`${email}/${contentUid}`)
      .putString('')
      .then(() => {
        db.collection('users')
          .doc(email)
          .collection('contents')
          .doc(contentUid)
          .set({ title: 'new content' })
          .then(() => {
            getContentsList();
          });
      });
  };

  if (loading) {
    return <div>LOADING...</div>;
  } else {
    return (
      <Container>
        <nav
          style={{
            display: 'flex',
            height: '80vh',
            flexDirection: 'column',
            padding: '1rem',
            borderRight: '1px solid rgba(0, 0, 0, 0.2)',
            overflow: 'scrollY',
          }}
          onClick={getContent}
        >
          <Button mb={3} onClick={createContent}>
            New content
          </Button>
          {contentTitleList.map((title, idx) => (
            <Button
              key={idx}
              variant="flat"
              sx={{
                width: '100%',
                textAlign: 'left',
                ':hover': { backgroundColor: 'rgba(0,0,0,0.2)' },
              }}
            >
              {title}
            </Button>
          ))}
        </nav>
        {currentContentId !== '' && (
          <WYSIWYG userData={userData!} contentId={currentContentId} />
        )}
      </Container>
    );
  }
}

export default ReviewResource;
