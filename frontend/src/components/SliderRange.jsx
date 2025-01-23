const SliderRange = ({
  value = 20,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className,
  style,
}) => {
  return (
    <div className={`slider-range-container ${className}`} style={style}>
      <div className="slider-range">
        <div
          className="slider-range-indicator"
          style={{ left: `calc(${value}% - 17px)` }}
        >
          <div className="slider-range-indicator__value">
            {parseFloat(value.toFixed(1))}
          </div>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
        />
        <progress min={min} max={max} value={value}></progress>
      </div>
    </div>
  );
};

export default SliderRange;
