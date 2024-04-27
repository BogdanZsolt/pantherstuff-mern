import { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Select, { components } from 'react-select';
import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeLine,
  RiListOrdered,
  RiListUnordered,
  RiDoubleQuotesL,
  RiUnderline,
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiAlignJustify,
  RiTable2,
  RiLink,
  RiImageAddLine,
  RiYoutubeLine,
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
import MediaLibrary from '../MediaLibrary';

const Menubar = ({ editor }) => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState('');

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = () => {
    setShow(true);
  };

  useEffect(() => {
    if (image !== '') {
      editor.chain().focus().setImage({ src: image }).run();
      setImage('');
    }
  }, [image, editor]);

  const addVideo = () => {
    const url = prompt('Enter YouTube URL');

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  if (!editor) {
    return null;
  }

  const headings = [
    { value: 0, label: 'Paragraph' },
    { value: 1, label: 'Heading-1' },
    { value: 2, label: 'Heading-2' },
    { value: 3, label: 'Heading-3' },
    { value: 4, label: 'Heading-4' },
    { value: 5, label: 'Heading-5' },
    { value: 6, label: 'Heading-6' },
  ];

  const Option = (props) => (
    <components.Option
      {...props}
      className={`${
        props.data.value !== 0 ? 'font-cursive' : 'font-sans-serif'
      } ${props.data.value > 0 ? 'fs-' + props.data.value : ''}`}
    >
      {props.data.label}
    </components.Option>
  );

  const aligns = [
    { value: 'left', label: <RiAlignLeft /> },
    { value: 'center', label: <RiAlignCenter /> },
    { value: 'right', label: <RiAlignRight /> },
    { value: 'justify', label: <RiAlignJustify /> },
  ];
  const fonts = [
    { label: 'Reset', value: 'reset' },
    { label: 'Poppins', value: 'Poppins' },
    { label: 'Macondo', value: 'Macondo' },
  ];
  const fontSizes = [
    { value: 'reset', label: 'Reset' },
    { value: '8px', label: '8px' },
    { value: '9px', label: '9px' },
    { value: '10px', label: '10px' },
    { value: '12px', label: '12px' },
    { value: '14px', label: '14px' },
    { value: '16px', label: '16px' },
    { value: '18px', label: '18px' },
    { value: '20px', label: '20px' },
    { value: '24px', label: '24px' },
    { value: '28px', label: '28px' },
    { value: '32px', label: '32px' },
    { value: '36px', label: '36px' },
    { value: '40px', label: '40px' },
    { value: '48px', label: '48px' },
    { value: '60px', label: '60px' },
    { value: '72px', label: '72px' },
    { value: '96px', label: '90px' },
  ];

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: '#faf0d1',
      color: '#000',
      borderColor: '#36241b',
      minHeight: 'unset',
      maxHeight: '36px',
    }),
    singleValue: (styles) => ({
      ...styles,
      color: '#36241b',
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      color: '#36241b',
    }),
    indicatorContainer: (styles) => ({
      ...styles,
      color: '#36241b',
    }),
    option: (styles, state) => ({
      ...styles,
      color: state.isSelected ? '#faf0d1' : '#36241b',
      backgroundColor: state.isSelected ? '#36241b' : '#faf0d1',
      width: 'auto',
    }),
    menu: (styles) => ({
      ...styles,
      width: 'max-content',
      minWidth: '100%',
    }),
  };

  const colorInHex = (rgbColor) => {
    if (!rgbColor) return '#000000';

    if (rgbColor.startsWith('#')) {
      return rgbColor;
    }

    const values = rgbColor.match(/\d+/g);
    if (!values || values.length !== 3) {
      throw new Error('Invalid RGB color format');
    }

    const hexValues = values.map((value) => {
      const hex = parseInt(value, 10).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    });

    return '#' + hexValues.join('').toUpperCase();
  };

  // const capitalize = (value) => {
  //   return value.charAt(0).toUpperCase() + value.slice(1);
  // };

  const headingHandler = (val) => {
    let { value } = val;
    if (value === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level: value }).run();
    }
  };

  const fontFamilyHandler = (choice) => {
    const { value } = choice;
    if (value && value === 'reset') {
      editor.chain().focus().unsetFontFamily().run();
    } else {
      editor.chain().focus().setFontFamily(value).run();
    }
  };

  const fontSizeHandler = (val) => {
    const { value } = val;
    if (value && value === 'reset') {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(value).run();
    }
  };

  const textAlignHandler = (choice) => {
    const { value } = choice;
    editor.chain().focus().setTextAlign(value).run();
  };

  // const HighlightHandler = (value) => {
  //   editor.chain().focus().setHighlight({ color: value }).run();
  // };

  const fontFamilyValue = (val) => {
    let font = {};
    fonts.map((f) => {
      if (f.value === val) {
        font = f;
      }
    });
    return font;
  };

  const getFontFamilyValue = () => {
    let font = '';
    if (
      editor.isActive('textStyle') &&
      editor.getAttributes('textStyle').fontFamily
    ) {
      font = editor.getAttributes('textStyle').fontFamily;
    } else if (editor.isActive('paragraph')) {
      font = 'Poppins';
    } else if (editor.isActive('heading')) {
      font = 'Macondo';
    } else {
      font = 'Poppins';
    }
    const object = fontFamilyValue(font);
    return object;
  };

  const getFontSizeValue = () => {
    let size = '';
    if (
      editor.isActive('textStyle') &&
      editor.getAttributes('textStyle').fontSize
    ) {
      size = editor.getAttributes('textStyle').fontSize;
    } else if (editor.isActive('paragraph')) {
      size = '20px';
    } else if (editor.isActive('heading')) {
      switch (editor.getAttributes('heading').level) {
        case 1:
          size = '40px';
          break;
        case 2:
          size = '32px';
          break;
        case 3:
          size = '28px';
          break;
        case 4:
          size = '24px';
          break;
        case 5:
          size = '20px';
          break;
        case 6:
          size = '16px';
          break;
      }
    } else {
      size = '20px';
    }
    let fs = {};
    fontSizes.map((fontSize) => {
      if (fontSize.value === size) {
        fs = fontSize;
      }
    });
    return fs;
  };

  const getHeading = () => {
    const h = editor.isActive('paragraph')
      ? 0
      : editor.getAttributes('heading').level;
    let heading = {};
    headings.map((head) => {
      if (head.value === h) {
        heading = head;
      }
    });
    return heading;
  };

  const getAlignValue = () => {
    for (let i = 0; i <= aligns.length - 1; i++) {
      if (editor.isActive({ textAlign: aligns[i].value })) {
        return aligns[i];
      }
    }
  };

  return (
    <>
      <div className="tiptap-menu">
        <Select
          onChange={fontFamilyHandler}
          value={getFontFamilyValue()}
          options={fonts}
          styles={selectStyles}
        />
        <Select
          options={headings}
          styles={selectStyles}
          value={getHeading()}
          onChange={headingHandler}
          components={{
            Option,
          }}
        />
        <Select
          options={fontSizes}
          value={getFontSizeValue()}
          onChange={fontSizeHandler}
          styles={selectStyles}
        />
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
          className={`tiptap-btn ${
            editor.isActive('italic') ? 'is-active' : ''
          }`}
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
          className={`tiptap-btn ${
            editor.isActive('strike') ? 'is-active' : ''
          }`}
          title="strike"
        >
          <RiStrikethrough />
        </a>
        <a
          onClick={setLink}
          className={`tiptap-btn ${editor.isActive('link') ? 'is-active' : ''}`}
          title="Link"
        >
          <RiLink />
        </a>
        <Select
          value={getAlignValue()}
          onChange={textAlignHandler}
          options={aligns}
          styles={selectStyles}
        />
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
        <a onClick={addImage} title="Add image" className="tiptap-btn">
          <RiImageAddLine />
        </a>
        <a onClick={addVideo} title="Add Video" className="tiptap-btn">
          <RiYoutubeLine />
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
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 2, cols: 3, withHeaderRow: true })
              .run()
          }
          className="tiptap-btn"
          title="Insert table"
        >
          <RiTable2 />
        </a>
        <Form.Control
          type="color"
          list="presetColor"
          onInput={(event) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          value={
            colorInHex(editor.getAttributes('textStyle').color) || '#36241b'
          }
          className="tiptap-color"
          title="Text color"
        />
        <datalist id="presetColor">
          <option>#36241b</option>
          <option>#FAF0D1</option>
          <option>#3c4c5d</option>
          <option>#6f42c1</option>
          <option>#d63384</option>
          <option>#d63384</option>
          <option>#e74c3c</option>
          <option>#fd7e14</option>
          <option>#f39c12</option>
          <option>#18bc9c</option>
          <option>#20c997</option>
          <option>#3498db</option>
          <option>#7b8a8b</option>
          <option>#f4f4f4</option>
          <option>#bdcecf</option>
          <option>#b5c0c1</option>
          <option>#9cabac</option>
          <option>#7b8a8b</option>
          <option>#486629</option>
          <option>#fff</option>
          <option>#000</option>
        </datalist>
        <Form.Control
          type="color"
          list="presetBgColor"
          onChange={(e) =>
            editor.chain().focus().setHighlight({ color: e.target.value }).run()
          }
          value={
            editor.isActive('highlight')
              ? editor.getAttributes('highlight').color
              : '#FAF0D1'
          }
          className="tiptap-color"
          title="Highlight color"
        />
        <datalist id="presetBgColor">
          <option>#36241b</option>
          <option>#FAF0D1</option>
          <option>#3c4c5d</option>
          <option>#6f42c1</option>
          <option>#d63384</option>
          <option>#d63384</option>
          <option>#e74c3c</option>
          <option>#fd7e14</option>
          <option>#f39c12</option>
          <option>#18bc9c</option>
          <option>#20c997</option>
          <option>#3498db</option>
          <option>#7b8a8b</option>
          <option>#f4f4f4</option>
          <option>#bdcecf</option>
          <option>#b5c0c1</option>
          <option>#9cabac</option>
          <option>#7b8a8b</option>
          <option>#486629</option>
          <option>#fff</option>
          <option>#000</option>
        </datalist>
        <MediaLibrary
          displayMedia={show}
          setDisplayMedia={setShow}
          setSelectedImg={setImage}
        />
      </div>
    </>
  );
};

export default Menubar;
