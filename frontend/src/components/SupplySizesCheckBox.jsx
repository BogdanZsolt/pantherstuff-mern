const SupplySizesCheckBox = ({ size, handler, checked }) => {
  return (
    <label className="supply-size-item">
      <input
        id={size._id}
        type="checkbox"
        className="supply-size-checkbox"
        value={size._id}
        onChange={(e) => handler(e.target.value)}
        checked={checked}
      />
      <div title={size.description} className="supply-size-inner">
        {size.title}
      </div>
    </label>
  );
};

export default SupplySizesCheckBox;
