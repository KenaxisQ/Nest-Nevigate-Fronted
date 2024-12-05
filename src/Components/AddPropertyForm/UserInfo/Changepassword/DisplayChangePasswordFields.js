import React, {useState,useRef} from "react";
export const DisplayChangePasswordFields = () =>{
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [showOtp, setShowOtp] = useState(false);
    const otpBoxReference = useRef([]);

    function handleChange(value, index) {
        let newArr = [...otp];
        newArr[index] = value;
        setOtp(newArr);
    
        if (value && index < 6 - 1) {
          otpBoxReference.current[index + 1].focus()
        }
      }
    
      function handleBackspaceAndEnter(e, index) {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
          otpBoxReference.current[index - 1].focus()
        }
        if (e.key === "Enter" && e.target.value && index < 6 - 1) {
          otpBoxReference.current[index + 1].focus()
        }
      }
      const onSubmit = (event) => {
        console.log(event.target.value)
      }
    return(
        <form onSubmit={(event) => onSubmit(event)} className="container pt-4">
            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="floatingInput" placeholder="Current Password" />
                                <label for="floatingPassword">Current Password</label>
                                </div>
                                <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                                <label for="floatingPassword">Password</label>
                                </div>
                                <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                                <label for="floatingPassword">Confirm Password</label>
                                </div>
                                <div>
                                <button type="submit" onClick={() => setShowOtp(true)}>{"Send OTP"}</button>
                                
                                    {showOtp && (<><div className='d-flex justify-content-around'>
                    <p>{"Enter Otp"}</p>
                </div><div>
                        {otp.map((digit, index) => (
                            <input key={index} value={digit} maxLength={1}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                                ref={(reference) => (otpBoxReference.current[index] = reference)}
                                className={`border w-5 h-auto text-black p-3 rounded-md block focus:border-2 focus:outline-none appearance-none box-border otpCss`}
                                style={{ width: '10px' }} />
                        ))}
                    </div></>)}
                    <button type="submit" className="PropertyNextButton">{"Change Password"}</button>
                                    </div>
        </form>
    );
}