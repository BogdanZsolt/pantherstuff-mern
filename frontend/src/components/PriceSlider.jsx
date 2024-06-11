import Slider from 'react-slider';

const PriceSlider = ({
  min,
  minPrice,
  setMinPrice,
  max,
  maxPrice,
  setMaxPrice,
}) => {
  const sliderHandler = (val) => {
    setMinPrice(val[0]);
    setMaxPrice(val[1]);
  };

  return (
    <div className="price-slider-container">
      <div className="price-slider-label">
        <span>${min}</span>
        <span>${max}</span>
      </div>
      <span className="range-label">current range ${maxPrice - minPrice}</span>
      <Slider
        value={[minPrice, maxPrice]}
        min={min}
        max={max}
        onChange={sliderHandler}
        className="price-slider"
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />
    </div>
  );
};

export default PriceSlider;
