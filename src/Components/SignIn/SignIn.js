import React, { useState, useEffect, useRef } from 'react';
import './SignIn.css';
import { useForm, useWatch } from "react-hook-form";
import HttpService from '../../Services/http';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
const Signin = ({ setIsAuthenticated, isAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const { register, handleSubmit, control, setValue } = useForm(); // useForm hook
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpError, setOtpError] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [registerOtp, setRegisterOtp] = useState(false);
  const [hidepassword, setHidePassword] = useState(false)
  const otpBoxReference = useRef([]);
  const correctOTP = "123456" // validate from your server
  var decodedResponse;
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

  useEffect(() => {
    if (otp.join("") !== "" && otp.join("") !== correctOTP) {
      setOtpError("❌ Wrong OTP Please Check Again")
    } else {
      setOtpError(null)
    }
  }, [otp]);
  // Watching form field values
  const values = useWatch({ control, defaultValue: "user" });


  const googleVerify = async (credentialResponse) => {
    if (isLogin) {
      
      var https = new HttpService();
      const googleVerifiedToken = await https.post('auth/validateGoogleAuthLogin', {token:credentialResponse?.credential});
      setIsAuthenticated(true)
      localStorage.setItem('AUTH_TOKEN', googleVerifiedToken?.data?.access_token);
    }
    else {
      
      decodedResponse = jwtDecode(credentialResponse?.credential);
      console.log(decodedResponse);
      // Set values to the form inputs dynamically
      const googleData = {
        email: decodedResponse?.email,
        firstname: decodedResponse?.given_name,
        lastname: decodedResponse?.family_name,
        username: decodedResponse?.name,
      };

      setFormValues(googleData);
    }
  }
  const setFormValues = (googleData) => {
    for (const [key, value] of Object.entries(googleData)) {
      setValue(key, value || ""); // Set value to form fields, defaulting to empty if the value is undefined or null
    }
  };
  // Form submission handler
  const onSubmit = async (data) => {  
    const { confirmPassword, rememberMe, termsAccepted, ...filteredData } = data;
    const { role, username, firstname, lastname, ...loginFilteredData } = filteredData;
    loginFilteredData.name = firstname + lastname;
    var https = new HttpService();
    if (isLogin && showOtp && otp.length == 6 && !hidepassword) {
      const userLogin = await https.post('auth/validateEmailOtpLogin', {email: values?.email, verificationCode: otp.join("")});
      setIsAuthenticated(true);
      localStorage.setItem('AUTH_TOKEN', userLogin?.data?.access_token); //get token and set in Localstorage
    }
    else if (isLogin && showOtp && otp.length == 6 && hidepassword) {
      await https.post('auth/forgotPassword', {identifier: values?.email})
      setShowOtp(false);
    }
    else if (isLogin && !showOtp) {
      const tokenData = await https.post('auth/login', {identifier: values?.email, password: values?.password});
     localStorage.setItem('AUTH_TOKEN', tokenData?.data?.access_token); //get token and set in Localstorage
     tokenData?.data?.access_token ? setIsAuthenticated(true) : setIsAuthenticated(false);
    }
    else {
      console.log("Form Submitted:", filteredData);
      if (!isLogin && data.password !== data.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Validated Data:", filteredData);
      const response = https.post('auth/register', loginFilteredData);
      alert(response);
      setRegisterOtp(true);
    }

  };
  const sendOtp =async () =>{
    var https = new HttpService();
    if(values?.email && !hidepassword){
    const sendOtp = await https.post('auth/loginWithOTP', {email: values?.email});
    }
    else if(values?.email && hidepassword){
      
        const sendOtp = await https.put('auth/forgotPassword', {identifier: values?.email});
        }
        setShowOtp(!showOtp)
  }
  const onOtpSubmit = async (data) => {
    var https = new HttpService();
    const response = await https.post('auth/verify', {email: values?.email, verificationCode: otp.join("")});
    if(response)
    {
      setIsAuthenticated(true);
    }
    else{
      alert("Enter Valid Otp");
      return;
    }
  }
  return (
    <>
      {!registerOtp && (<div className="sign">
        <div className="signform">
          <div>
            <div className="signtitle">
              <h1 className="nn_title">Nest Navigate</h1>
            </div>
            {true && (<><div className="btnWrapper" style={{ display: "flex" }}>
              <button
                className={`btn ${isLogin ? "loginButton" : "registerbtn"}`}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button
                className={`btn ${!isLogin ? "loginButton" : "registerbtn"}`}
                onClick={() => { setIsLogin(false); setShowOtp(false) }}
              >
                Sign Up
              </button>
            </div><div className="signforms">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Account Type (Sign Up only) */}
                  {!isLogin && (
                    <div>
                      <label>Account Type</label>
                      <select
                        className="formcontrols"
                        {...register("role")}
                      >
                        <option value="USER">USER</option>
                        <option value="AGENT">AGENT</option>
                      </select>
                    </div>
                  )}
                  {!isLogin && (
                    <div>
                      <label>First Name</label>
                      <input
                        className="formcontrols"
                        type="text"
                        placeholder="Enter your First name"
                        {...register("firstname", { required: true })} />
                    </div>
                  )}
                  {!isLogin && (
                    <div>
                      <label>Phone Number</label>
                      <input
                        className="formcontrols"
                        type="text"
                        placeholder="Enter your Phone Number"
                        {...register("phone", { required: true })} />
                    </div>
                  )}
                  {!isLogin && (
                    <div>
                      <label>Last Name</label>
                      <input
                        className="formcontrols"
                        type="text"
                        placeholder="Enter your Last name"
                        {...register("lastname", { required: true })} />
                    </div>
                  )}
                  {/* Username (Sign Up only) */}
                  {!isLogin && (
                    <div>
                      <label>Username</label>
                      <input
                        className="formcontrols"
                        type="text"
                        placeholder="Enter your full name"
                        {...register("username", { required: true })} />
                    </div>
                  )}
                  {/* Email */}
                  <div>
                    <label>Email:</label>
                    <input
                      className="formcontrols"
                      type="email"
                      placeholder="Enter your email"
                      value={decodedResponse?.email}
                      {...register("email", { required: true })} />
                  </div>
                  {isLogin && <p onClick={sendOtp}>{!showOtp ? "Send Otp" : hidepassword ? " ": "Password"}</p>}
                  {showOtp && (
                    <div className='flex items-center gap-2'>
                      {otp.map((digit, index) => (
                        <input key={index} value={digit} maxLength={1}
                          onChange={(e) => handleChange(e.target.value, index)}
                          onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                          ref={(reference) => (otpBoxReference.current[index] = reference)}
                          className={`border w-5 h-auto text-black p-3 rounded-md block focus:border-2 focus:outline-none appearance-none box-border otpCss`}
                          style={{ width: '10px' }} />
                      ))}
                    </div>
                  )}
                  {/* Password */}
                  {!showOtp && (!hidepassword && (<div>
                    <label>Password</label>
                    <input
                      className="formcontrols"
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", { required: true })} />
                  </div>))}
                  {/* Confirm Password (Sign Up only) */}
                  {!isLogin && (
                    <div>
                      <label>Confirm Password</label>
                      <input
                        className="formcontrols"
                        type="password"
                        placeholder="Confirm your password"
                        {...register("confirmPassword", { required: true })} />
                    </div>
                  )}
                  {/* Remember Me (Sign In only) */}
                  {!hidepassword && (isLogin & !showOtp) && (
                    <div>
                      <div className="tog">
                        <label className="switch rememberme">
                          <input
                            type="checkbox"
                            {...register("rememberMe")} />
                          <span className="slider round"></span>
                        </label>
                        <p style={{ marginBottom: "0px" }} onClick={showOtp}>
                          Remember me <br />
                        </p>
                      </div>
                      <div className="forgotPassword">
                        <p onClick={() => {setHidePassword(true)}}>Forgot Password?</p>
                      </div>
                    </div>
                  )}
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn loginButton"
                    style={{ width: "100%", margin: "20px 0px" }}
                  >
                    {isLogin ? "Login" : "Register"}
                  </button>
                  {/* Terms and Conditions (Sign Up only) */}
                  {!isLogin && (
                    <div className="signupcheckbox">
                      <input
                        className="me-2"
                        type="checkbox"
                        {...register("termsAccepted", { required: true })} />
                      <label className="form-check-label">
                        Accept Terms and Conditions
                      </label>
                    </div>
                  )}
                  <h5 className='text-center'>{isLogin ? "or Sign In with" : "Register with"}</h5>
                  {(
                    <GoogleLogin
                      onSuccess={credentialResponse => {
                        googleVerify(credentialResponse);
                        console.log(credentialResponse);
                      }}
                      onError={() => {
                        console.log('Login Failed');
                      }} />
                  )}
                </form>
              </div></>)}
          </div>
        </div>
      </div>)}
      {!isLogin && (<div className="sign">
        <div className="signform">
          {registerOtp && (
              <form onSubmit={handleSubmit(onOtpSubmit)}>
            <div className='flex items-center gap-2'>
              {otp.map((digit, index) => (
                <input key={index} value={digit} maxLength={1}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                  ref={(reference) => (otpBoxReference.current[index] = reference)}
                  className={`border w-5 h-auto text-black p-3 rounded-md block focus:border-2 focus:outline-none appearance-none box-border otpCss`}
                  style={{ width: '10px' }} />
              ))}
            </div><button>Submit Otp</button></form>
          )}
        </div>
      </div>)}
    </>
  );
};


export default Signin;