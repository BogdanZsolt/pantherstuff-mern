const ColorCheckBox = ({ index, color }) => {
  return (
    <label className="select-color-item">
      <input
        id={index}
        type="checkbox"
        className="select-color-checkbox"
        value={color}
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
