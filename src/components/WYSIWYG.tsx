import React, { useState, MouseEvent, useEffect } from 'react';
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

const EditorContainer = ({ children, ...rest }: BoxProps) => (
  <Box {...rest} padding="1rem" fontSize={[2, 3, 4]}>
    {children}
  </Box>
);

const EditorRichUtilBtn = ({ children, ...rest }: ButtonProps) => (
  <Button {...rest} variant="flat">
    {children}
  </Button>
);

function WYSIWYG() {
  const [editorState, setEditorState] = useState(
    EditorState.moveFocusToEnd(EditorState.createEmpty()),
  );

  useEffect(() => {
    const getContentFromURL = async () => {
      const url = await storage
        .ref()
        .child('test/testtest')
        .getDownloadURL();
      console.log(url);
      const { data: RawDraftContentState } = await axios.get(url);
      console.log(RawDraftContentState);
      setEditorState(
        EditorState.createWithContent(convertFromRaw(RawDraftContentState)),
      );
    };
    getContentFromURL();
  }, []);

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

  const onMouseDownSave = (e: MouseEvent) => {
    console.log(e.target);
    if (!editorState.isEmpty) {
      const contentState = editorState.getCurrentContent();
      const stringfyContentState = JSON.stringify(convertToRaw(contentState));
      console.log(stringfyContentState);
      storage
        .ref()
        .child('test/testtest')
        .putString(stringfyContentState)
        .on('state_changed', snapshot => {
          switch (snapshot.state) {
            case firebase.storage.TaskState.RUNNING:
              break;
          }
        });
    }
  };

  return (
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
      />
      <div>
        <Button onMouseDown={onMouseDownSave}>Save</Button>
      </div>
    </EditorContainer>
  );
}

export default WYSIWYG;
