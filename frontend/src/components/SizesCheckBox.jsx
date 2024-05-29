const SizesCheckBox = ({ size, handler, checked }) => {
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
      <div title={size.description} className="select-size-inner">
        {size.title}
      </div>
    </label>
  );
};

export default SizesCheckBox;
