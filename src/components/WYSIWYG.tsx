import React, { useState, Props, ReactNode } from 'react';
import { Editor, EditorState, RichUtils, DraftEditorCommand } from 'draft-js';
import styled from 'styled-components';
import { Box, Button, BoxProps, ButtonProps } from 'rebass';

const EditorContainer = ({ children, ...rest }: BoxProps) => (
  <Box {...rest} height="100vh" padding="1rem" fontSize={[2, 3, 4]}>
    {children}
  </Box>
);

const EditorRichUtilBtn = ({ children, ...rest }: ButtonProps) => (
  <Button {...rest} variant="flat">
    {children}
  </Button>
);

function WYSIWYG() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

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
    </EditorContainer>
  );
}

export default WYSIWYG;
