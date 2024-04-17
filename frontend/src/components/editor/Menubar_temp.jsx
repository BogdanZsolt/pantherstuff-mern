import { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
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
  RiLink,
  RiImageAddLine,
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

  const addImage = useCallback(() => {
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const headings = [0, 1, 2, 3, 4, 5, 6];
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
    8, 9, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 60, 72, 96,
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
    menuList: (styles) => ({
      ...styles,
      backgroundColor: '#faf0d1',
      color: '#36241b',
    }),
  };

  // const getHeading = () => {
  //   for (let i = 1; i <= 6; i++) {
  //     if (editor.isActive('heading', { level: i })) {
  //       return `Heading ${i}`;
  //     }
  //   }
  //   return 'paragraph';
  // };

  // const getAlign = () => {
  //   for (let i = 0; i <= aligns.length - 1; i++) {
  //     if (editor.isActive({ textAlign: aligns[i].value })) {
  //       return aligns[i].label;
  //     }
  //   }
  // };

  const getAlignValue = () => {
    for (let i = 0; i <= aligns.length - 1; i++) {
      if (editor.isActive({ textAlign: aligns[i].value })) {
        return aligns[i];
      }
    }
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
  const headingHandler = (value) => {
    console.log(value);
    value = Number(value);
    if (value === 0) {
      console.log(`console: ${value}`);
      editor.chain().focus().setParagraph().run();
    } else {
      console.log(`else: ${value}`);
      editor.chain().focus().toggleHeading({ level: value }).run();
    }
    // if (value === 0) {
    //   editor.chain().focus().setParagraph().run();
    // } else {
    //   editor.chain().focus().toggleHeading({ level: value }).run();
    // }
  };

  const fontFamilyHandler = (choice) => {
    const { value } = choice;
    console.log(value);
    if (value && value === 'reset') {
      editor.chain().focus().unsetFontFamily().run();
    } else {
      editor.chain().focus().setFontFamily(value).run();
    }
  };

  const fontSizeHandler = (value) => {
    if (value && value === 'reset') {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(value).run();
    }
  };

  const textAlignHandler = (choice) => {
    const { value } = choice;
    console.log(value);
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

  const getFontFamilyObject = () => {
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
    return font;
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
    return size;
  };

  // console.log(editor.getAttributes('heading').level);
  console.log(getFontFamilyObject());
  console.log(fonts.map((font) => font));
  // console.log(getAlignValue());

  return (
    <div className="tiptap-menu">
      <Select
        onChange={fontFamilyHandler}
        value={getFontFamilyObject()}
        options={fonts}
        styles={selectStyles}
      />
      <Form.Select
        aria-label="Default select fontFamily"
        onChange={(e) => fontFamilyHandler(e.target.value)}
        className="tiptap-select"
        value={getFontFamilyValue()}
      >
        {fonts.map((font, index) => (
          <option key={index} value={font.value}>
            {font.label}
          </option>
        ))}
      </Form.Select>
      <Form.Select
        aria-label="select heading"
        className="tiptap-select"
        onChange={(e) => headingHandler(e.target.value)}
        value={
          editor.isActive('paragraph')
            ? 0
            : editor.getAttributes('heading').level
        }
      >
        {headings.map((heading, index) => (
          <option
            key={index}
            value={heading}
            className={heading === 0 ? '' : `fs-${heading} font-cursive`}
          >
            {heading === 0 ? 'Paragraph' : `Heading-${heading}`}
          </option>
        ))}
      </Form.Select>
      {/* <Dropdown as="span">
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
          className="tiptap-btn"
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
            Paragraph
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
      </Dropdown> */}
      <Form.Select
        aria-label="Default select fontSize"
        onChange={(e) => fontSizeHandler(e.target.value)}
        className="tiptap-select"
        value={getFontSizeValue()}
      >
        <option value="reset">Reset</option>
        {fontSizes.map((fontSize, index) => (
          <option key={index} value={`${fontSize}px`}>
            {`${fontSize}px`}
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
      {/* TextAlign Dropdown */}
      {/* <Dropdown as="span">
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-text-align"
          className="tiptap-btn"
          title={`Text align`}
        >
          {getAlign()}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ '--bs-dropdown-min-width': 0 }}>
          {aligns.map((align, index) => (
            <Dropdown.Item
              key={index}
              onClick={() =>
                editor.chain().focus().setTextAlign(align.value).run()
              }
              className={
                editor.isActive({ textAlign: align.value }) ? 'is-active' : ''
              }
              title={`Text align ${align.value}`}
            >
              {align.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown> */}
      {/* End TextAlign Dropdown */}
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
      <Form.Control
        type="color"
        list="presetColor"
        onInput={(event) =>
          editor.chain().focus().setColor(event.target.value).run()
        }
        value={colorInHex(editor.getAttributes('textStyle').color) || '#36241b'}
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
    </div>
  );
};

export default Menubar;
