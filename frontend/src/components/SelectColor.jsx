import ColorRadioBox from './ColorRadioBox';

const SelectColor = ({ colors, color, setColor }) => {
  const colorHandler = (e, index) => {
    const activeData = document.getElementById(index).checked;
    if (activeData) {
      setColor(e.target.value);
    }
  };

  return (
    <div className="select-color">
      {colors.map((col, index) => (
        <ColorRadioBox
          key={index}
          name="selectColor"
          color={col}
          handler={colorHandler}
          isChecked={color === col}
        />
      ))}
    </div>
  );
};

export default SelectColor;
