import { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TbColorPicker, TbColorPickerOff } from 'react-icons/tb';
import { HexColorPicker, HexColorInput } from 'react-colorful';

const InputColors = ({ colors, setColors }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [pickerShow, setPickerShow] = useState(false);

  const colorAddHandler = () => {
    setColors((oldColors) => [...oldColors, '#FFFFFF']);
  };

  const colorRemoveHandler = () => {
    let newColors = colors.filter((color) => color !== colors[selectedColor]);
    setColors(newColors);
    setSelectedColor(0);
  };

  const colorPickerHandler = () => {
    setPickerShow(!pickerShow);
  };

  const colorChangeHandler = (val) => {
    let newColors = [...colors];
    newColors[selectedColor] = val;
    setColors(newColors);
  };

  return (
    <div className="colors-container">
      {colors.map((color, index) => (
        <div
          key={index}
          id={index}
          className={`color-box ${selectedColor === index ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={(e) => setSelectedColor(e.target.id * 1)}
        ></div>
      ))}
      <a className="colors-add-btn" onClick={colorAddHandler}>
        <GrAdd />
      </a>
      <a className="colors-remove-btn" onClick={colorRemoveHandler}>
        <RiDeleteBinLine />
      </a>
      <div className="color-picker-container">
        <a className="colors-picker-btn" onClick={colorPickerHandler}>
          {pickerShow ? <TbColorPickerOff /> : <TbColorPicker />}
        </a>
        {pickerShow && (
          <>
            <HexColorInput
              color={colors[selectedColor]}
              onChange={colorChangeHandler}
              alpha
              prefixed
              className="color-picker-input"
            />
            <HexColorPicker
              color={colors[selectedColor]}
              onChange={colorChangeHandler}
              alpha
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InputColors;
