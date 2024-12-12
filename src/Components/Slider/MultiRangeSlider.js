import MultiRangeSlider from "multi-range-slider-react";
import React, { useState } from "react";
import './MultiRangeSlider.css'
const CustomRangeSlider = ({min, max, value, onChange}) => {
  const [rangeValues, setRangeValues] = useState({ min: 10, max: 90 });

  const handleSliderChange = (e) => {
    onChange({ min: e.minValue, max: e.maxValue });
    setRangeValues({ min: e.minValue, max: e.maxValue });
  };

  return (
    <div>
      <MultiRangeSlider
        min={0}
        max={100}
        step={1}
        minValue={rangeValues.min}
        maxValue={rangeValues.max}
        onInput={handleSliderChange}
      />
      <p className="minMaxWrapper" style={{height:'20px'}}>Min Value: <input type="text" value={rangeValues.min}/> Max Value:<input type="text" value={rangeValues.max}/></p>

      {/* <div>
        <p>Min Value: {rangeValues.min}</p>
        <p>Max Value: {rangeValues.max}</p>
      </div> */}
    </div>
  );
};

export default CustomRangeSlider;

