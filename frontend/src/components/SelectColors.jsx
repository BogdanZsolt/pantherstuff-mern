import ColorCheckBox from './ColorCheckBox';
import Loader from './Loader';
import Message from './Message';
import { RiCloseLine } from 'react-icons/ri';
import { useGetProductsAllColorsQuery } from '../slices/productsApiSlice';

const SelectColors = ({ colors, setColors }) => {
  const { data: allColors, isLoading, error } = useGetProductsAllColorsQuery();

  const colorHandler = (e, index) => {
    const activeData = document.getElementById(index).checked;
    if (activeData) {
      setColors((oldData) => [...oldData, e.target.value]);
    } else {
      setColors(colors.filter((value) => value !== e.target.value));
    }
  };

  const colorResetHandler = () => {
    if (colors.length > 0) {
      colors.map((item) => {
        document.getElementById(item).checked = false;
      });
      setColors([]);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.Message || error.error}
        </Message>
      ) : (
        <div className="select-colors-container">
          <div className="select-colors">
            {allColors[0].colors.map((color, index) => (
              <ColorCheckBox
                key={index}
                index={color}
                color={color}
                handler={colorHandler}
              />
            ))}
          </div>
          <div className="color-reset-container">
            <div
              className="color-reset-btn shadow-lg"
              title="colors reset"
              onClick={colorResetHandler}
            >
              <RiCloseLine className="color-reset" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectColors;
