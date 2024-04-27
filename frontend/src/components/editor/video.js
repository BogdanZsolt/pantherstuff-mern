import { Node, mergeAttributes } from '@tiptap/core';

const video = Node.create({
  name: 'video', // unique name for the Node
  group: 'block', // belongs to the 'block' group of extensions
  selectable: true, // so we can select the video
  draggable: true, // so we can drag the video
  atom: true, // is a single unit

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'video',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ({ editor, node }) => {
      const div = document.createElement('div');
      div.className = 'video-container';
      const iframe = document.createElement('iframe');
      iframe.width = '640';
      iframe.height = '300';
      iframe.allowFullscreen = '';
      iframe.src = node.attrs.src;
      div.append(iframe);
      return {
        dom: iframe,
      };
    };
  },
});
