import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import Paragraph from "@tiptap/extension-paragraph";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Text from "@tiptap/extension-text";
import {
  Editor as EditorTipTapProp,
  EditorContent,
  EditorEvents,
  useEditor,
} from "@tiptap/react";
import { useDebounceEffect } from "ahooks";
import { forwardRef, useEffect, useState } from "react";
import { apply, tw } from "twind";
import { css } from "twind/css";
import { Box } from "../../../atoms";
import { editorStyle } from "../../../utils/twind";
import { EditorProps } from "../../types";
import { Menu } from "./menu";
import { EditorDatatableProps } from "../../../types";

const Editor = forwardRef(
  (props: EditorProps, ref: React.Ref<HTMLDivElement> | undefined) => {
    const {
      className = "",
      rootStyle,
      content,
      onChange = () => {},
      debounceWaitTime = 1000,
      ...rest
    } = props;

    const [contentState, setcontentState] = useState<
      EditorDatatableProps | undefined
    >(content);
    const [contentdelayed, setcontentdelayed] = useState<
      EditorDatatableProps | undefined
    >();

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

    const editor: EditorTipTapProp | null = useEditor({
      extensions,
      editorProps: {
        attributes: {
          class: tw`
        ${css(editorStyle)}`,
        },
      },
      onUpdate({ editor: editorState }: EditorEvents["update"]) {
        setcontentState(editorState?.getJSON() as EditorDatatableProps);
      },
      content: contentState,
    });
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
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
        <Box className={tw("flex gap-8 mt-4 mb-12 w-full justify-center")}>
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
  }
);

Editor.displayName = "Editor";

export { Editor };
