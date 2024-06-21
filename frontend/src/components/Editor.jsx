import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
// import BubbleMenu from '@tiptap/extension-bubble-menu';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { TextAlign } from '@tiptap/extension-text-align';
// import Dropcursor from '@tiptap/extension-dropcursor';
// import MyImage from './editor/MyImage';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Image from '@tiptap/extension-image';
import ImageResize from './editor/ImageResize.js';
import Typography from '@tiptap/extension-typography';
import FontSize from './editor/fontSize';
import Menubar from './editor/Menubar';
import TableMenu from './editor/TableMenu';
import Video from '@tiptap/extension-youtube';
// import TableMenu from './editor/TableMenu';
// const Table = lazy(() => import('@tiptap/extension-table'));

const extensions = [
  StarterKit,
  Typography,
  Underline,
  TextStyle,
  FontFamily,
  FontSize,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  Link.configure({
    autolink: false,
    openOnClick: 'whenNotEditable',
    protocols: [
      'mailto',
      {
        scheme: 'tel',
        optionalSlashes: true,
      },
    ],
    validate: (href) => /^https?:\/\//.test(href),
    HTMLAttributes: {
      target: '_blank',
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph', 'image', 'youtube'],
    defaultAlignment: 'left',
  }),
  // Dropcursor,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableCell,
  TableHeader,
  ImageResize,
  Image.configure({
    inline: true,
    allowBase64: true,
  }),
  Video.configure({
    inline: true,
    width: 640,
    height: 480,
    controls: true,
    autoplay: false,
  }),
  // MyImage,
];

// const content = ``;

const Editor = ({ content, onDataChange, editable }) => {
  const editor = useEditor({
    editable,
    extensions,
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onDataChange(html);
    },
    content: content || '',
  });

  useEffect(() => {
    if (!editor) return;
    let { from, to } = editor.state.selection;
    editor.commands.setContent(content, false, { preserveWhitespace: 'full' });
    editor.commands.setTextSelection({ from, to });
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  return (
    <div>
      {editable && <Menubar editor={editor} />}
      {editable && <TableMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
