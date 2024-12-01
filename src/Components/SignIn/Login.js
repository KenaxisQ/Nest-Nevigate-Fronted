import React, { useState, useEffect, useRef } from 'react';
import image from '../../Assets/nn_bg3.svg'
import { useForm, useWatch } from "react-hook-form";
import { GoogleLogin } from '@react-oauth/google';
import './Login.css';
import HttpService from '../../Services/http';
import { jwtDecode } from 'jwt-decode';
export const Login = ({setIsAuthenticated}) => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [showOtp, setShowOtp] = useState(false);
    const [otpError, setOtpError] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const [newPassword, setNewPassword] = useState(false);
    const [registerOtp, setRegisterOtp] = useState(false);
    const { register, handleSubmit, control, setValue } = useForm();
    const otpBoxReference = useRef([]);
    const values = useWatch({ control, defaultValue: "user" });
    var decodedResponse;

    console.log(values);
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
        if (otp.join("") !== "" && otp.join("") !== "212121") {
          setOtpError("❌ Wrong OTP Please Check Again")
        } else {
          setOtpError(null)
        }
      }, [otp]);

    const sendOtp =async (type, isForgot) =>{
        
        var https = new HttpService();
        if(values?.email && type === 'SendOtp' && !isForgot && !newPassword){
            setShowOtp(true)
        const sendOtp = await https.post('auth/loginWithOTP', {email: values?.email}, false, true);
        }
        else if(values?.email && type === 'Forgot Password' && isForgot || newPassword){ //check this condition newPassword if anything wrong remove newpassword here and above
            setShowOtp(true)
            setNewPassword(true);
            const sendOtp = await https.post('auth/forgotPassword', {identifier: values?.email}, false, true);
            }
      }
      const googleVerify = async (credentialResponse) => {
        if (isLogin) {
          var https = new HttpService();
          const googleVerifiedToken = await https.post('auth/validateGoogleAuthLogin', {token:credentialResponse?.credential}, false, true);
          
          localStorage.setItem('AUTH_TOKEN', googleVerifiedToken?.data?.access_token);
          setIsAuthenticated(true)
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
      const onSubmit = async (data, registerOtpSubmit=false) => {
          
        const { confirmPassword, rememberMe, termsAccepted, ...filteredData } = data;
        const { role, username, firstname, lastname, ...loginFilteredData } = filteredData;
        loginFilteredData.name = firstname + lastname;
        var https = new HttpService();
        if (isLogin && showOtp && otp.length == 6 && !newPassword) {
            // login with Otp and email
            
          var userLogin = await https.post('auth/validateEmailOtpLogin', {email: values?.email, verificationCode: otp.join("")}, false, true);
          setIsAuthenticated(true);
         // localStorage.setItem('AUTH_TOKEN', 'xy'); //get token and set in Localstorage
        }
        else if (isLogin && !showOtp) {
        // login with username and password
          var tokenData = await https.post('auth/login', {identifier: values?.email, password: values?.password}, false, true);
         localStorage.setItem('AUTH_TOKEN', tokenData?.data?.access_token); //get token and set in Localstorage

        tokenData?.data?.access_token ? setIsAuthenticated(true) : setIsAuthenticated(false);
        }
        else if(isLogin && newPassword){
            
            var changePassword = await https.put('auth/verifyAndResetPassword', {identifier: values?.email, password: values?.password, code: otp.join("")}, false, true);
            setIsAuthenticated(true);
        }
        else if(registerOtpSubmit){
          console.log("Form Submitted:", filteredData);
          if (!isLogin && data.password !== data.confirmPassword) {
            alert("Passwords do not match!");
            return;
          }
          console.log("Validated Data:", filteredData);
          await https.post('auth/verify', {email: values?.email, verificationCode: otp.join("")}, false, true);
          setIsAuthenticated(true);
        }
        else{
            await https.post('auth/register', loginFilteredData, false, true);
            setRegisterOtp(true);
            //setIsAuthenticated(true);
        }
    
      };
    return (
        <section className="vh-100" style={{ backgroundColor: "#9A616D;" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-12">
                        <div className="card" style={{ borderRadius: "1rem;" }}>
                            <div className="row g-0">
                                <div className="col-md-8 col-lg-8 d-none d-md-block">
                                    <img src={image}
                                        alt="login form" className="img-fluid"
                                        style={{
                                            // borderRadius: "1rem 0 0 1rem", 
                                            objectFit: "cover",
                                            width: "100%",
                                            height: "100%"
                                        }}
                                    />
                                </div>
                                {/* Login Page */}
                                {isLogin && (<div className="col-md-4 col-lg-4 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleSubmit((data) => onSubmit(data, false))}>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219;" }}></i>
                                                <span className="h1 fw-bold mb-0">Nest Navigate</span>
                                            </div>
                                            <h5 className="mb-3 pb-3" style={{}}>Sign into your account</h5>

                                            <div data-mdb-input-init className="form-outline">
                                                <div className='d-flex text-start flex-column'>
                                                    <label>Email</label>
                                                    <input
                                                        className="formcontrols logins rounded-0 is-invalid"
                                                        type="text"
                                                        placeholder="Enter your email"
                                                        style={{ color: "#BDC3C7", border: "solid 1px", lineHeight: "0px"
                                                         }}
                                                         required
                                                         {...register("email", { required: true })} />
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-between flex-row'>
                                                <p onClick={() => {sendOtp('SendOtp', false)}}>{"Send Otp"}</p>
                                                {showOtp && <p onClick={() => {setShowOtp(false); setNewPassword(false)}} className='text-end'>{"Login with password"}</p>}
                                            </div>
                                            {showOtp && (
                                                <div className='d-flex justify-content-around mb-4'>
                                                
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
                                            {!showOtp &&(<><div data-mdb-input-init className="form-outline">
                                                <div className='d-flex text-start flex-column'>
                                                    <label>Password</label>
                                                    <input
                                                        className="formcontrols logins rounded-0"
                                                        type="password"
                                                        placeholder="Enter your password"
                                                        style={{ color: "#BDC3C7", border: "solid 1px", lineHeight: "0px" }}
                                                        {...register("password", { required: true })} />
                                                </div>
                                            </div><div className="forgotPassword small text-muted">
                                                    <p onClick={() => {sendOtp('Forgot Password', true)}}>Forgot Password?</p>
                                                </div></>)}
                                            {
                                                newPassword && (
                                                    <><div data-mdb-input-init className="form-outline">
                                                <div className='d-flex text-start flex-column'>
                                                    <label>New Password</label>
                                                    <input
                                                        className="formcontrols logins rounded-0"
                                                        type="password"
                                                        placeholder="Enter your New password"
                                                        style={{ color: "#BDC3C7", border: "solid 1px", lineHeight: "0px" }}
                                                        {...register("password", { required: true })} />
                                                </div>
                                            </div></>
                                                )
                                            }
                                            <div className="pt-1 mb-4">
                                                <button className="PropertyNextButton" type="submit">{!newPassword ? "Login" : "Forgot Password"} </button>
                                            </div>
                                            <h5 className='text-center'>{true ? "or Sign In with" : "Register with"}</h5>
                                            {(
                                                <div >
                                                    <GoogleLogin
                                                        onSuccess={credentialResponse => {
                                                            googleVerify(credentialResponse);
                                                            console.log(credentialResponse);
                                                        }}
                                                        onError={() => {
                                                            console.log('Login Failed');
                                                        }}

                                                    />
                                                </div>
                                            )}
                                            <div className="mb-5 pb-lg-2" style={{ color: "#393f81;" }}>
                                                Don't have an account?
                                                <p className="registerHere"
                                                    onClick={() => setIsLogin(false)}
                                                >Register here</p>
                                            </div>
                                        </form>

                                    </div>
                                </div>)}
                                {/* Register Page */}
                                {!isLogin && !registerOtp && (<div className="col-md-4 col-lg-4 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleSubmit((data) => onSubmit(data, false))}>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219;" }}></i>
                                                <span className="h1 fw-bold mb-0">Nest Navigate</span>
                                            </div>
                                            <h5 className="mb-3 pb-3" style={{}}>Register into your account</h5>

                                            <div>
                                            <div className='d-flex text-start flex-column'>

                                                <label>Account Type</label>
                                                <select
                                                    className="formcontrols logins rounded-0"
                                                    {...register("role")}
                                                >
                                                    <option value="USER">USER</option>
                                                    <option value="AGENT">AGENT</option>
                                                </select>
                                            </div>
                                            </div>
                                            <div>
                                                <div className='d-flex text-start flex-column'>
                                                    <label>First Name</label>
                                                    <input
                                                        className="formcontrols logins rounded-0"
                                                        type="text"
                                                        placeholder="Enter your First Name"
                                                        style={{ color: "#BDC3C7", border: "solid 1px", lineHeight: "0px" }}
                                                        {...register("firstname", { required: true })}
                                                    />
                                                </div>
                                            </div>
                                            <div data-mdb-input-init className="form-outline">
                                                <div className='d-flex text-start flex-column'>
                                                    <label>Last Name</label>
                                                    <input
                                                        className="formcontrols logins rounded-0"
                                                        type="text"
                                                        placeholder="Enter your Last Name"
                                                        style={{ color: "#BDC3C7", border: "solid 1px", lineHeight: "0px" }}
                                                        {...register("lastname", { required: true })} />
                                                </div>
                                            </div>
                                            <div data-mdb-input-init className="form-outline">
                                                <div className='d-flex text-start flex-column'>
                                                    <label>Phone Number</label>
                                                    <input
                                                        className="formcontrols logins rounded-0"
                                                        type="text"
                                                        placeholder="Enter your Phone Number"
                                                        style={{ color: "#BDC3C7", border: "solid 1px", lineHeight: "0px" }}
                                                        {...register("phone", { required: true })} />
                                                </div>
                                            </div>
                                            <div data-mdb-input-init className="form-outline">
                                                <div className='d-flex text-start flex-column'>
                                                    <label>Username</label>
                                                    <input
                                                        className="formcontrols logins rounded-0"
                                                        type="text"
                                                        placeholder="Enter your Username"
                                                        style={{ color: "#BDC3C7", border: "solid 1px", lineHeight: "0px" }}
                                                        {...register("username", { required: true })}
                                                    />
                                                </div>
                                            </div>
                                            <div data-mdb-input-init className="form-outline">
                                                <div className='d-flex text-start flex-column'>
                                                    <label>Email:</label>
                                                    <input
                                                        className="formcontrols logins rounded-0"
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        style={{ color: "#BDC3C7", border: "solid 1px", lineHeight: "0px" }}
                                                        value={decodedResponse?.email}
                                                        {...register("email", { required: true })} 
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div data-mdb-input-init className="form-outline">
                                                <div className='d-flex text-start flex-column'>
                                                    <label>Password</label>
                                                    <input
                                                        className="formcontrols logins rounded-0"
                                                        type="password"
                                                        placeholder="Enter your password"
                                                        style={{ color: "#BDC3C7", border: "solid 1px", lineHeight: "0px" }}
                                                    {...register("password", { required: true })} 
                                                    />
                                                </div>
                                            </div>
                                            <div data-mdb-input-init className="form-outline">
                                                <div className='d-flex text-start flex-column'>
                                                    <label>Confirm Password</label>
                                                    <input
                                                        className="formcontrols logins rounded-0"
                                                        type="password"
                                                        placeholder="Enter your password"
                                                        style={{ color: "#BDC3C7", border: "solid 1px", lineHeight: "0px" }}
                                                    {...register("confirmPassword", { required: true })} 
                                                    />
                                                </div>
                                            </div>
                                            <div className="pt-1 mb-2">
                                                <button className="PropertyNextButton" type="submit">Register</button>
                                            </div>
                                            <div className="text-start">
                                            <input
                                                className="me-2"
                                                type="checkbox"
                                                {...register("termsAccepted", { required: true })} 
                                                />
                                            <label className="form-check-label">
                                                Accept Terms and Conditions
                                            </label>
                                            </div>
                                            <h5 className='text-center'>{false ? "or Sign In with" : "Register with"}</h5>
                                            {(
                                                <div >
                                                    <GoogleLogin
                                                        onSuccess={credentialResponse => {
                                                            googleVerify(credentialResponse);
                                                            console.log(credentialResponse);
                                                        }}
                                                        onError={() => {
                                                            console.log('Login Failed');
                                                        }}

                                                    />
                                                </div>
                                            )}
                                            <div className="mb-5 pb-lg-2" style={{ color: "#393f81;" }}>
                                                Already have an account?
                                                <p className="registerHere"
                                                    onClick={() => setIsLogin(true)}
                                                >Login</p>
                                            </div>
                                        </form>

                                    </div>
                                </div>)}
                                {registerOtp && (
                                    <div className="col-md-4 col-lg-4 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                    <form onSubmit={handleSubmit((data) => onSubmit(data, true))}>
                                    <h3 className='d-flex text-start mb-4'>Enter OTP</h3>
                                     <div className='d-flex justify-content-around mb-4'>
                                     {otp.map((digit, index) => (
                                         <input key={index} value={digit} maxLength={1}
                                         onChange={(e) => handleChange(e.target.value, index)}
                                         onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                                         ref={(reference) => (otpBoxReference.current[index] = reference)}
                                         className={`border w-5 h-auto text-black p-3 rounded-md block focus:border-2 focus:outline-none appearance-none box-border otpCss`}
                                         style={{ width: '10px' }} />
                                     ))}
                                     </div>
                                     <button type="submit" className="PropertyNextButton">
                                        Submit OTP
                                    </button>
                                     </form>
                                     </div>
                                     </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}