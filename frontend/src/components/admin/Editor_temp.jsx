import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Editor = ({ value, setValue }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Start typing...',
      toolbarButtonSize: 'large',
      textIcons: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
      controls: {
        font: {
          command: 'fontname',
          list: {
            "'Poppins', sans-serif": 'Poppins',
            "'Macondo', 'cursive'": 'Macondo',
          },
        },
      },
      // disablePlugins:
      //   'print,speech-recognize,copyformat,delete-command,drag-and-drop,drag-and-drop-element,dtd,enter,file,focus,font,format-block,fullsize,hotkeys,hr,iframe,indent,inline-popup,justify,key-arrow-outside,limit,line-height,link,mobile,ordered-list,paste,paste-from-word,paste-storage,placeholder,powered-by-jodit,preview,redo-undo,resize-cells,search,select,select-cells,size,spellcheck,stat,sticky,symbols,tab,table,table-keyboard-navigation,video,wrap-nodes,xpath,about',
    }),
    []
  );

  return (
    <JoditEditor
      ref={editor}
      value={value || ''}
      config={config}
      tabIndex={1}
      onChange={(newContent) => setValue(newContent)}
    />
  );
};

export default Editor;
