import { BubbleMenu } from '@tiptap/react';
import {
  RiInsertColumnLeft,
  RiInsertColumnRight,
  RiDeleteColumn,
  RiInsertRowBottom,
  RiInsertRowTop,
  RiDeleteRow,
  RiMergeCellsHorizontal,
  RiSplitCellsHorizontal,
  RiLayoutRowFill,
  RiLayoutColumnFill,
  RiPaintFill,
} from 'react-icons/ri';
import { TbTableOff } from 'react-icons/tb';

const TableMenu = ({ editor }) => {
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      shouldShow={({ editor }) => {
        return editor.isActive('table');
      }}
      className="tiptap-bubble"
    >
      <a
        className="tiptap-btn"
        onClick={() => editor.chain().focus().addColumnBefore().run()}
        disabled={!editor.can().addColumnBefore()}
        title="Insert Column Before"
      >
        <RiInsertColumnLeft />
      </a>
      <a
        className="tiptap-btn"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        disabled={!editor.can().addColumnAfter()}
        title="Insert Column After"
      >
        <RiInsertColumnRight />
      </a>
      <a
        className="tiptap-btn"
        onClick={() => editor.chain().focus().deleteColumn().run()}
        disabled={!editor.can().deleteColumn()}
        title="Delete Column"
      >
        <RiDeleteColumn />
      </a>
      <a
        className="tiptap-btn"
        onClick={() => editor.chain().focus().addRowBefore().run()}
        disabled={!editor.can().addRowBefore()}
        title="Insert row above"
      >
        <RiInsertRowTop />
      </a>
      <a
        className="tiptap-btn"
        onClick={() => editor.chain().focus().addRowAfter().run()}
        disabled={!editor.can().addRowAfter()}
        title="Insert row below"
      >
        <RiInsertRowBottom />
      </a>
      <a
        className="tiptap-btn"
        onClick={() => editor.chain().focus().deleteRow().run()}
        disabled={!editor.can().deleteRow()}
        title="Delete row"
      >
        <RiDeleteRow />
      </a>
      <a
        className="tiptap-btn"
        onClick={() => editor.chain().focus().mergeCells().run()}
        disabled={!editor.can().mergeCells()}
        title="Merge cells"
      >
        <RiMergeCellsHorizontal />
      </a>
      <a
        className="tiptap-btn"
        onClick={() => editor.chain().focus().splitCell().run()}
        disabled={!editor.can().splitCell()}
        title="Split cells"
      >
        <RiSplitCellsHorizontal />
      </a>
      <a
        className="tiptap-btn"
        onClick={() => editor.chain().focus().toggleHeaderRow().run()}
        disabled={!editor.can().toggleHeaderRow()}
        title="Toggle header row"
      >
        <RiLayoutRowFill />
      </a>
      <a
        className="tiptap-btn"
        onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
        disabled={!editor.can().toggleHeaderColumn()}
        title="Toggle header column"
      >
        <RiLayoutColumnFill />
      </a>
      <a
        className="tiptap-btn"
        onClick={() => editor.chain().focus().toggleHeaderCell().run()}
        disabled={!editor.can().toggleHeaderCell()}
        title="Toggle header cell"
      >
        <RiPaintFill />
      </a>
      <a
        className="tiptap-btn"
        onClick={() => editor.chain().focus().deleteTable().run()}
        disabled={!editor.can().deleteTable()}
      >
        <TbTableOff />
      </a>
    </BubbleMenu>
  );
};

export default TableMenu;
