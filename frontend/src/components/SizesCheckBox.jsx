import { useTranslation } from 'react-i18next';

const SizesCheckBox = ({ size, handler, checked }) => {
  const { i18n } = useTranslation();

  return (
    <label className="select-size-item">
      <input
        id={size._id}
        type="checkbox"
        className="select-size-checkbox"
        value={size._id}
        onChange={(e) => handler(e.target.value)}
        checked={checked}
      />
      <div
        title={
          i18n.language === 'en'
            ? size.description
            : size.translations?.hu?.description || size.description
        }
        className="select-size-inner"
      >
        {i18n.language === 'en'
          ? size.title
          : size.translations?.hu?.title || size.title}
      </div>
    </label>
  );
};

export default SizesCheckBox;
