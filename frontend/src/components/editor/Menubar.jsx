import { Form, Dropdown } from 'react-bootstrap';
import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeLine,
  RiListOrdered,
  RiListUnordered,
  RiDoubleQuotesL,
  RiUnderline,
} from 'react-icons/ri';
import { TbSpacingVertical } from 'react-icons/tb';
import { MdOutlineLayersClear } from 'react-icons/md';
import {
  AiOutlineEnter,
  AiOutlineUndo,
  AiOutlineRedo,
  AiOutlineClose,
} from 'react-icons/ai';
import { PiCodeBlock } from 'react-icons/pi';

const Menubar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const headings = [1, 2, 3, 4, 5, 6];
  const fonts = [
    { label: 'Font', value: '' },
    { label: 'Poppins', value: 'Poppins' },
    { label: 'Macondo', value: 'Macondo' },
  ];
  const fontSizes = [8, 9, 10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96];

  const getHeading = () => {
    for (let i = 1; i <= 6; i++) {
      if (editor.isActive('heading', { level: i })) {
        return `Heading ${i}`;
      }
    }
    return 'Heading 1';
  };

  const fontFamilyHandler = (value) => {
    if (value && value !== '') {
      editor.chain().focus().setFontFamily(value).run();
    } else {
      editor.chain().focus().unsetFontFamily().run();
    }
  };

  const fontSizeHandler = (value) => {
    console.log(value);
    if (value && value !== '') {
      editor.chain().focus().setFontSize(value).run();
    } else {
      editor.chain().focus().unsetFontSize().run();
    }
  };

  return (
    <div>
      <Form.Select
        aria-label="Default select fontFamily"
        onChange={(e) => fontFamilyHandler(e.target.value)}
        className="me-1 tiptap-select"
      >
        {fonts.map((font, index) => (
          <option key={index} value={font.value}>
            {font.label}
          </option>
        ))}
      </Form.Select>
      <Dropdown as="span">
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
          className="tiptap-btn me-1"
        >
          {editor.isActive('paragraph') ? 'Paragaph' : getHeading()}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`lead ${
              editor.isActive('paragraph') ? 'is-active' : ''
            }`}
          >
            Paragrap
          </Dropdown.Item>
          {headings.map((heading) => (
            <Dropdown.Item
              key={heading}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: heading }).run()
              }
              className={`fs-${heading} font-cursive ${
                editor.isActive('heading', { level: heading })
                  ? 'is-active'
                  : ''
              }`}
            >
              Heading {heading}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Form.Select
        aria-label="Default select fontSize"
        onChange={(e) => fontSizeHandler(e.target.value)}
        className="me-1 tiptap-select"
      >
        <option value="">font size</option>
        {fontSizes.map((fontSize, index) => (
          <option key={index} value={`${fontSize}px`}>
            {fontSize}
          </option>
        ))}
      </Form.Select>
      <a
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`tiptap-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
        title="bold"
      >
        <strong>
          <RiBold />
        </strong>
      </a>
      <a
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`tiptap-btn ${editor.isActive('italic') ? 'is-active' : ''}`}
        title="Italic"
      >
        <RiItalic />
      </a>
      <a
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`tiptap-btn ${
          editor.isActive('underline') ? 'is-active' : ''
        }`}
        title="Underline"
      >
        <RiUnderline />
      </a>
      <a
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`tiptap-btn ${editor.isActive('strike') ? 'is-active' : ''}`}
        title="strike"
      >
        <RiStrikethrough />
      </a>
      <a
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`tiptap-btn ${editor.isActive('code') ? 'is-active' : ''}`}
        title="code"
      >
        <RiCodeLine />
      </a>
      <a
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="tiptap-btn"
        title="clear marks"
      >
        <MdOutlineLayersClear />
      </a>
      <a
        onClick={() => editor.chain().focus().clearNodes().run()}
        className="tiptap-btn"
        title="clear nodes"
      >
        <AiOutlineClose />
      </a>
      <a
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`tiptap-btn ${
          editor.isActive('bulletList') ? 'is-active' : ''
        }`}
        title="bulleted list"
      >
        <RiListUnordered />
      </a>
      <a
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`tiptap-btn ${
          editor.isActive('orderedList') ? 'is-active' : ''
        }`}
        title="ordered list"
      >
        <RiListOrdered />
      </a>
      <a
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`tiptap-btn ${
          editor.isActive('codeBlock') ? 'is-active' : ''
        }`}
        title="Code block"
      >
        <PiCodeBlock />
      </a>
      <a
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`tiptap-btn ${
          editor.isActive('blockquote') ? 'is-active' : ''
        }`}
        title="blockquote"
      >
        <RiDoubleQuotesL />
      </a>
      <a
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="tiptap-btn"
        title="horizontal rule"
      >
        <TbSpacingVertical />
      </a>
      <a
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="tiptap-btn"
        title="hard break"
      >
        <AiOutlineEnter />
      </a>
      <a
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="tiptap-btn"
        title="undo"
      >
        <AiOutlineUndo />
      </a>
      <a
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="tiptap-btn"
        title="redo"
      >
        <AiOutlineRedo />
      </a>
      <a
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={`tiptap-btn ${
          editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''
        }`}
      >
        purple
      </a>
    </div>
  );
};

export default Menubar;
