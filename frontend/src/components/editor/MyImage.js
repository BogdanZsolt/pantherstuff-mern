import { Image } from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/react';

const MyImage = Image.extend({
  addOptions: {
    ...Image.options,
    sizes: ['inline', 'block', 'left', 'right'],
  },
  renderHTML({ HTMLAttributes }) {
    const { style } = HTMLAttributes;
    return [
      'figure',
      { style },
      ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
    ];
  },
});

export default MyImage;
