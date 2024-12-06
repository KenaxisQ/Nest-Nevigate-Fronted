import React, { useState } from "react";
import "./SlideSwitch.css";

const SlideSwitch = ({ onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    onToggle(!isChecked);
  };

  return (
    <div className="remember-me-container">
      <label className={`switch ${isChecked ? "on" : ""}`}>
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
        <span className="slider"></span>
      </label>
      <span className="label-text">Remember Me</span>
    </div>
  );
};

export default SlideSwitch;
