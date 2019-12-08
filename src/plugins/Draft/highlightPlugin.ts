import { RichUtils, EditorState } from 'draft-js';

const YELLOW = '#fffe0d';

export default () => {
  return {
    customStyleMap: {
      HIGHLIGHT: {
        background: YELLOW,
      },
    },
    keyBindingFn: (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'h') {
        return 'highlight';
      }
    },
    handleKeyCommand: (
      command: string,
      editorState: EditorState,
      {
        setEditorState,
      }: { setEditorState: React.Dispatch<React.SetStateAction<EditorState>> },
    ) => {
      if (command === 'highlight') {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
        return true;
      }
    },
  };
};
