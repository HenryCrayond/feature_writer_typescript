import {
  RiDeleteColumn,
  RiDeleteRow,
  RiInsertColumnLeft,
  RiInsertColumnRight,
  RiInsertRowBottom,
  RiInsertRowTop,
} from "react-icons/ri";
import { Button, Icon } from "../../../atoms";

export function Menu({ editor }: any) {
  return (
    <>
      <Icon className="w-5 h-5" as={RiInsertColumnLeft} />

      <Button
        variant="ghost"
        color="gray"
        title="Add a column to before"
        onClick={() => editor.chain().focus().addColumnBefore().run()}
      >
        <Icon className="w-5 h-5" as={RiInsertColumnLeft} />
      </Button>
      <Button
        variant="ghost"
        color="gray"
        title="Add a column after"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
      >
        <Icon className="w-5 h-5" as={RiInsertColumnRight} />
      </Button>
      <Button
        variant="ghost"
        color="gray"
        title="Delete a column"
        onClick={() => editor.chain().focus().deleteColumn().run()}
      >
        <Icon className="w-5 h-5" as={RiDeleteColumn} />
      </Button>
      <Button
        variant="ghost"
        color="gray"
        title="Add a row above"
        onClick={() => editor.chain().focus().addRowBefore().run()}
      >
        <Icon className="w-5 h-5" as={RiInsertRowTop} />
      </Button>
      <Button
        variant="ghost"
        color="gray"
        title="Add a row below"
        onClick={() => editor.chain().focus().addRowAfter().run()}
      >
        <Icon className="w-5 h-5" as={RiInsertRowBottom} />
      </Button>
      <Button
        color="gray"
        variant="ghost"
        title="Delete a row"
        onClick={() => editor.chain().focus().deleteRow().run()}
      >
        <Icon className="w-5 h-5" as={RiDeleteRow} />
      </Button>
    </>
  );
}
