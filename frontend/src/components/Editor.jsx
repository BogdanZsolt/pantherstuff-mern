import {
  useEffect,
  // useCallback
} from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import Link from '@tiptap/extension-link';
import { TextAlign } from '@tiptap/extension-text-align';
import FontSize from './editor/fontSize';
import Menubar from './editor/Menubar';

const extensions = [
  StarterKit,
  Underline,
  TextStyle,
  FontFamily,
  FontSize,
  Link.configure({ validate: (href) => /^https?:\/\//.test(href) }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
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
    content: '',
  });

  useEffect(() => {
    editor?.commands?.setContent(content);
  }, [content, editor]);

  // const setLink = useCallback(() => {
  //   const previousUrl = editor.getAttributes('link').href;
  //   const url = window.prompt('URL', previousUrl);

  //   // cancelled
  //   if (url === null) {
  //     return;
  //   }

  //   // empty
  //   if (url === '') {
  //     editor.chain().focus().extendMarkRange('link').unsetLink().run();

  //     return;
  //   }
  //   editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  // }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div>
      {editable && <Menubar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
