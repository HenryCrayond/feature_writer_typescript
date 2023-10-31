import Document from '@tiptap/extension-document';
import History from '@tiptap/extension-history';
import Paragraph from '@tiptap/extension-paragraph';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import { useDebounceEffect } from 'ahooks';
import { forwardRef, useEffect, useState } from 'react';
import { apply, tw } from 'twind';
import { css } from 'twind/css';
import { editorStyle } from '../../../utils/twind';
import { Menu } from './menu';
import { Box } from '../../../atoms';
import { EditorProps } from '../../types';

const Editor = forwardRef((props:EditorProps, ref: React.Ref<HTMLDivElement> | undefined) => {
  const {
    className = '',
    rootStyle,
    content,
    onChange = () => {},
    debounceWaitTime = 1000,
    ...rest
  } = props;
  console.log(props,"786785");
  
  const [contentState, setcontentState] = useState(content);
  const [contentdelayed, setcontentdelayed] = useState();

  const rootTw = apply`${rootStyle}`;

  const extensions = [
    Document,
    Paragraph,
    Text,
    History.configure({
      depth: 10,
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow.configure({}),
    TableHeader.configure({}),
    TableCell,
  ];

  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: tw`
        ${css(editorStyle)}`,
      },
    },
    onUpdate({ editor: editorState }) {
      setcontentState(editorState?.getJSON());
    },
    content: contentState,
  });
  const handleDragStart = (event:React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragOver = (event:React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event:React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useDebounceEffect(
    () => {
      setcontentdelayed(contentState);
    },
    [contentState],
    {
      wait: debounceWaitTime,
    }
  );

  useEffect(() => {
    onChange(contentState);
  }, [contentdelayed]);

  return (
    <Box ref={ref} className={tw(rootTw, className)} {...rest}>
      <Box className={tw('flex gap-8 mt-4 mb-12 w-full justify-center')}>
        <Menu editor={editor} />
      </Box>
      <EditorContent
        editor={editor}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
    </Box>
  );
});

Editor.displayName = 'Editor';

export { Editor };
