import Image from '@tiptap/extension-image';

const ImageResize = Image.extend({
  addOptions() {
    return {
      ...this.parent?.(),
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      className: {
        default: 'resizable-img',
      },
      style: {
        default: 'width: 100%; height: auto;',
      },
    };
  },
  addNodeView() {
    return ({ node, editor, getPos }) => {
      const {
        view,
        options: { editable },
      } = editor;
      const { src, alt, className, style } = node.attrs;
      const $container = document.createElement('div');
      const $img = document.createElement('img');

      console.log(style);

      $container.appendChild($img);
      $container.setAttribute('class', 'resizable-img-container');
      $img.setAttribute('src', src);
      $img.setAttribute('alt', alt);
      $img.setAttribute('class', className);
      $img.setAttribute('style', style);
      $img.setAttribute('height', 'auto');
      $img.setAttribute('draggable', 'true');

      if (!editable) return { dom: $img };

      let isResizing = false;
      let startX, startWidth, startHeight;

      $container.addEventListener('click', () => {
        const $dot = document.createElement('div');
        $dot.setAttribute('class', 'resizable-img-resizer');

        $dot.addEventListener('mousedown', (e) => {
          e.preventDefault();
          isResizing = true;
          startX = e.clientX;
          startWidth = $container.offsetWidth;
          startHeight = $container.offsetHeight;

          const onMouseMove = (e) => {
            if (!isResizing) return;

            const deltaX = e.clientX - startX;

            const aspectRatio = startWidth / startHeight;
            const newWidth = startWidth + deltaX;
            // const newHeight = newWidth / aspectRatio;

            $img.style.width = newWidth + 'px';
            $img.style.aspectRatio = aspectRatio;
            // $img.style.height = newHeight + 'px';
          };

          const onMouseUp = () => {
            if (isResizing) {
              isResizing = false;
            }
            if (typeof getPos === 'function') {
              const newAttrs = {
                ...node.attrs,
                style: `${$img.style.cssText}`,
              };
              view.dispatch(
                view.state.tr.setNodeMarkup(getPos(), null, newAttrs)
              );
            }

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        });
        if (!$container.classList.contains('isSelected')) {
          $container.appendChild($dot);
          $container.classList.add('isSelected');
        }
      });

      document.addEventListener('click', (e) => {
        if (
          !$container.contains(e.target) &&
          !$container.classList.contains('ProseMirror-selectednode') &&
          $container.classList.contains('isSelected')
        ) {
          $container.removeAttribute('style');
          $container.removeChild($container.lastChild);
          $container.classList.remove('isSelected');
          console.log('töröl');
        }
      });

      return {
        dom: $container,
      };
    };
  },
});

export default ImageResize;
