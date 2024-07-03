const ColorRadioBox = ({ color, name, handler, isChecked }) => {
  return (
    <label className="select-color-item">
      <input
        id={color}
        name={name}
        type="radio"
        value={color}
        onChange={(e) => handler(e, color)}
        checked={isChecked}
        className="select-color-radiobox"
      />
      <div
        title={color}
        className="select-color-inner"
        style={{ backgroundColor: color, outlineColor: color }}
      ></div>
    </label>
  );
};

export default ColorRadioBox;
