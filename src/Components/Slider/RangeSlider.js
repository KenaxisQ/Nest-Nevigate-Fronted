import React, { useState } from 'react';
import './RangeSlider.css';

const RangeSlider = ({ min = 0, max = 100, step = 1, value: initialValue = 0, onChange }) => {
  const [value, setValue] = useState(initialValue);

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue); // Pass the new value to the parent component
    }
  };

  // Dynamically calculate the percentage of the selected range
  const filledPercentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="slider-container">
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        style={{
          background: `linear-gradient(to right, #1F4B43 ${filledPercentage}%, #ddd ${filledPercentage}%)`, // Dynamically fill the track
        }}
      />
    </div>
  );
};

export default RangeSlider;
