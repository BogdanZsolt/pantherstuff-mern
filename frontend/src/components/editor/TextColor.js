import { Extension } from '@tiptap/core';
import '@tiptap/extension-text-style';

export default Extension.create({
  name: 'TextColor',

  defaultOptions: {
    types: ['textStyle'],
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            renderHTML: (attributes) => {
              if (!attributes.color) {
                return {};
              }

              return {
                style: `color: ${attributes.color}`,
              };
            },
            parseHTML: (element) => {
              // console.log(element.style.color); // Why is the initial value converted to rgb?
              return {
                color: element.style.color.replace(/['"]+/g, ''),
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setColor:
        (color) =>
        ({ commands }) => {
          return commands.setMark('textStyle', { color });
        },
      unsetColor:
        () =>
        ({ chain }) => {
          return chain()
            .setMark('textStyle', { color: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
