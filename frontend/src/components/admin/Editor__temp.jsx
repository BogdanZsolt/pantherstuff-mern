import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BlotFormatter from 'quill-format-img';

const Editor = ({ value, onChange }) => {
  Quill.register('modules/blotFormatter', BlotFormatter);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }, { font: ['Poppins', 'Macondo'] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'blockquote', 'code-block'],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['formula', 'clean'],
      ],
    },
    blotFormatter: {},
    clipboard: {
      matchVisual: true,
    },
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'align',
    'background',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'color',
    'code-block',
    'formula',
    'clean',
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default Editor;
