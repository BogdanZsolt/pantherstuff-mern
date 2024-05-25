const ColorCheckBox = ({ index, color, handler }) => {
  return (
    <label className="select-color-item">
      <input
        id={index}
        type="checkbox"
        className="select-color-checkbox"
        value={color}
        onChange={(e) => handler(e, index)}
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
