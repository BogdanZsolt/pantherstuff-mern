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

  console.log(min);

  return (
    <div className="price-slider-container">
      <div className="price-slider-label">
        <span className="min-value">${min}</span>
        <span className="max-value">${max}</span>
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
