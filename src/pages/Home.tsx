import React, { useState } from 'react';
import { EditorState, DraftEditorCommand, RichUtils, Editor } from 'draft-js';
import { BoxProps, Box, ButtonProps, Button } from 'rebass';

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

function Home() {
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

  const welcomeMent = `자유롭게 작성하고
어디서든 사용하며
복습 알람을 받으세요.
Google Login만으로 자유롭게 사용 가능합니다.`;
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '50%' }}>
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
            placeholder={welcomeMent}
          />
        </EditorContainer>
      </div>
    </div>
  );
}

export default Home;
