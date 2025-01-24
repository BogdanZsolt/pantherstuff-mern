import Editor from '../../components/Editor.jsx';

const TextViewer = ({ content }) => {
  return (
    <div className="textviewer-container scrollto">
      <Editor content={content} editable={false} />
    </div>
  );
};

export default TextViewer;
