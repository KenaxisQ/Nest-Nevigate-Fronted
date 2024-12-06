import React, { useState } from "react";
import "./OtpInput.css"; // You can define your own styles

const OtpInput = ({ onComplete }) => {
  const [otp, setOtp] = useState(Array(6).fill("")); // Initially 6 empty fields

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) return; // Only allow numeric input

    // Update OTP array with the value typed in the current field
    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    setOtp(updatedOtp);

    // Automatically move to next field if value is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Call onComplete when OTP is fully entered (i.e., all 6 digits are filled)
    if (updatedOtp.every((digit) => digit !== "")) {
      onComplete(updatedOtp.join(""));
    }
  };

  const handleFocus = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="otp-input-container">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleFocus(e, index)}
          className="otp-input"
        />
      ))}
    </div>
  );
};

export default OtpInput;
