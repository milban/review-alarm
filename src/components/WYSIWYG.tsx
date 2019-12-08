import React, { useState, useEffect } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  DraftEditorCommand,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import { Box, Button, BoxProps, ButtonProps } from 'rebass';
import { storage } from '../firebase';
import firebase from 'firebase';
import axios from 'axios';

import '../../node_modules/draft-js/dist/Draft.css';

const EditorContainer = ({ children, ...rest }: BoxProps) => (
  <Box {...rest} padding="1rem" fontSize={[2, 3, 4]} sx={{ lineHeight: '1.5' }}>
    {children}
  </Box>
);

const EditorRichUtilBtn = ({ children, ...rest }: ButtonProps) => (
  <Button {...rest} variant="flat">
    {children}
  </Button>
);

function WYSIWYG({
  userData,
  contentTitle,
}: {
  userData: firebase.User;
  contentTitle: string;
}) {
  const [editorState, setEditorState] = useState(
    EditorState.moveFocusToEnd(EditorState.createEmpty()),
  );
  const [contentLoading, setContentLoading] = useState(true);
  const email = userData.email!;

  useEffect(() => {
    const getContentFromURL = async () => {
      setContentLoading(true);
      const url = await storage
        .ref('review_contents')
        .child(`${email}/${contentTitle}`)
        .getDownloadURL();
      const { data: RawDraftContentState } = await axios.get(url);
      setEditorState(
        EditorState.createWithContent(convertFromRaw(RawDraftContentState)),
      );
      setContentLoading(false);
    };
    getContentFromURL();
  }, [contentTitle]);

  const onMouseDownSave = () => {
    if (!editorState.isEmpty) {
      const contentState = editorState.getCurrentContent();
      const stringfyContentState = JSON.stringify(convertToRaw(contentState));
      const title = contentState.getPlainText().split('\n')[0];
      storage
        .ref('review_contents')
        .child(`${email}/${title}`)
        .putString(stringfyContentState);
    }
  };

  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onStrikeThroughClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
  };

  return contentLoading ? (
    <div>Loading...</div>
  ) : (
    <EditorContainer>
      <div style={{ marginBottom: '1rem' }}>
        <EditorRichUtilBtn onClick={onUnderlineClick}>__</EditorRichUtilBtn>
        <EditorRichUtilBtn onClick={onBoldClick}>
          <span style={{ fontWeight: 'bold' }}>B</span>
        </EditorRichUtilBtn>
        <EditorRichUtilBtn onClick={onItalicClick}>
          <span style={{ fontStyle: 'italic' }}>I</span>
        </EditorRichUtilBtn>
        <EditorRichUtilBtn onClick={onStrikeThroughClick}>
          <span style={{ textDecoration: 'line-through' }}>abc</span>
        </EditorRichUtilBtn>
      </div>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={setEditorState}
        spellCheck
        placeholder="Title"
      />
      <div style={{ marginTop: '1rem' }}>
        <Button onMouseDown={onMouseDownSave}>save</Button>
      </div>
    </EditorContainer>
  );
}

export default WYSIWYG;
