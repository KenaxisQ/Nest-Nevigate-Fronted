import React, { useState } from 'react';
import './SignIn.css';
import { useForm, useWatch } from "react-hook-form";
import HttpService from '../../Services/http';


const Signin = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    const { register, handleSubmit, control } = useForm(); // useForm hook
  
    // Watching form field values
    const xyz = useWatch({ control, defaultValue: "user" });
    
  
    // Form submission handler
    const onSubmit = (data) => {
        const { confirmPassword, rememberMe, termsAccepted, ...filteredData } = data;
        var https = new HttpService();
      console.log("Form Submitted:", filteredData);
      if (!isLogin && data.password !== data.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Validated Data:", filteredData);
      const response = https.post('register', filteredData);
      alert(response);
    };
  
    return (
      <div className="sign">
        <div className="signform">
          <div>
            <div className="signtitle">
              <h1 className="nn_title">Nest Navigate</h1>
            </div>
            <div className="btnWrapper" style={{ display: "flex" }}>
              <button
                className={`btn ${isLogin ? "loginButton" : "registerbtn"}`}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button
                className={`btn ${!isLogin ? "loginButton" : "registerbtn"}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>
            <div className="signforms">
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
                      {...register("firstname", { required: true })}
                    />
                  </div>
                )}
                {!isLogin && (
                  <div>
                    <label>Phone Number</label>
                    <input
                      className="formcontrols"
                      type="text"
                      placeholder="Enter your Phone Number"
                      {...register("phone", { required: true })}
                    />
                  </div>
                )}
                {!isLogin && (
                  <div>
                    <label>Last Name</label>
                    <input
                      className="formcontrols"
                      type="text"
                      placeholder="Enter your Last name"
                      {...register("lastname", { required: true })}
                    />
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
                      {...register("username", { required: true })}
                    />
                  </div>
                )}
                {/* Email */}
                <div>
                  <label>Email:</label>
                  <input
                    className="formcontrols"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                  />
                </div>
                {/* Password */}
                <div>
                  <label>Password</label>
                  <input
                    className="formcontrols"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", { required: true })}
                  />
                </div>
                {/* Confirm Password (Sign Up only) */}
                {!isLogin && (
                  <div>
                    <label>Confirm Password</label>
                    <input
                      className="formcontrols"
                      type="password"
                      placeholder="Confirm your password"
                      {...register("confirmPassword", { required: true })}
                    />
                  </div>
                )}
                {/* Remember Me (Sign In only) */}
                {isLogin && (
                  <div>
                    <div className="tog">
                      <label className="switch rememberme">
                        <input
                          type="checkbox"
                          {...register("rememberMe")}
                        />
                        <span className="slider round"></span>
                      </label>
                      <p style={{ marginBottom: "0px" }}>
                        Remember me <br />
                      </p>
                    </div>
                    <div className="forgotPassword">
                      <p>Forgot Password?</p>
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
                      {...register("termsAccepted", { required: true })}
                    />
                    <label className="form-check-label">
                      Accept Terms and Conditions
                    </label>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

// // Login Component
// const Login = () => {
//     return (
//         <div>
//             <h2>Login</h2>
//             <form>
//                 <div>
//                     <label>Email:</label>
//                     <input type="email" placeholder="Enter your email" required />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input type="password" placeholder="Enter your password" required />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// Register Component
// const Register = () => {
//     return (
//         <div>
//             <h2>Register</h2>
//             <form>
//                 <div>
//                     <label>Full Name:</label>
//                     <input type="text" placeholder="Enter your full name" required />
//                 </div>
//                 <div>
//                     <label>Email:</label>
//                     <input type="email" placeholder="Enter your email" required />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input type="password" placeholder="Enter your password" required />
//                 </div>
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// };


// // const styles = {
//     navbar: {
//         display: 'flex',
//         justifyContent: 'center',
//         padding: '10px',
//         background: '#333',
//     },
//     button: {
//         margin: '0 10px',
//         padding: '10px 20px',
//         backgroundColor: '#555',
//         color: 'white',
//         border: 'none',
//         cursor: 'pointer',
//         borderRadius: '5px',
//     },
//     activeButton: {
//         margin: '0 10px',
//         padding: '10px 20px',
//         backgroundColor: '#007BFF',
//         color: 'white',
//         border: 'none',
//         cursor: 'pointer',
//         borderRadius: '5px',
//     },
//     container: {
//         marginTop: '20px',
//         padding: '20px',
//         textAlign: 'center',
//     },
// // };

export default Signin;
