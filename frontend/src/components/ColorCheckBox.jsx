const ColorCheckBox = ({ index, color, handler, checked }) => {
  return (
    <label className="select-color-item">
      <input
        id={index}
        type="checkbox"
        className="select-color-checkbox"
        value={color}
        onChange={(e) => handler(e, index)}
        checked={checked}
      />
      <div
        title={color}
        className="select-color-inner"
        style={{ backgroundColor: color, outlineColor: color }}
      ></div>
    </label>
  );
};

export default ColorCheckBox;
