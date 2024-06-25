import Slider from 'react-slider';
import { toCurrency } from '../utils/converter';
import { useTranslation } from 'react-i18next';

const PriceSlider = ({
  min,
  minPrice,
  setMinPrice,
  max,
  maxPrice,
  setMaxPrice,
}) => {
  const { i18n } = useTranslation('shop');
  const sliderHandler = (val) => {
    setMinPrice(val[0]);
    setMaxPrice(val[1]);
  };

  return (
    <div className="price-slider-container">
      <div className="price-slider-label">
        <span>{toCurrency(i18n.language, minPrice)}</span>
        <span>{toCurrency(i18n.language, maxPrice)}</span>
      </div>
      {/* <span className="range-label">
        {t('currentRange', {
          price: toCurrency(i18n.language, maxPrice - minPrice),
        })}{' '}
      </span> */}
      <Slider
        value={[minPrice, maxPrice]}
        min={min}
        max={max}
        onChange={sliderHandler}
        className="price-slider"
        pearling
        // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />
    </div>
  );
};

export default PriceSlider;
