import React, { useState } from 'react';
import './SignIn.css';


const Signin = () => {
    const [isLogin, setIsLogin] = useState(true); // 'login' or 'register'

    return (
        <div className='sign'> 
            <div className='signform'>
           <div>
            <div className='signtitle'>
                <h1 class='nn_title'>Nest Navigate</h1>
                </div>
            <div className='btnWrapper' style={{display:'flex'}}>
            <button className= {`btn ${isLogin?'loginButton':'registerbtn'}`} onClick={() => setIsLogin(true)}>Login</button>
            <button className= {`btn ${!isLogin?'loginButton':'registerbtn'}`} onClick={() => setIsLogin(false)}>Register</button>
           </div>
                <div className='signforms'>            
                <form>
                {!isLogin &&<div>
                        <label>Account Type</label>
                        <select className="formcontrols" id="Account Type"   required >
                            <option value="user">USER</option>
                            <option value="agent">AGENT</option>
                        </select>                        
                    </div>}
                   {!isLogin &&<div>
                        <label>Username</label>
                        <input className="formcontrols" type="text" placeholder="Enter your full name" required />
                    </div>}
                    <div>
                        <label>Email:</label>
                        <input className='formcontrols' type="email" placeholder="Enter your email" required />
                    </div>
                    <div>
                        <label>Password</label>
                        <input className='formcontrols' type="password" placeholder="Enter your password" required />
                    </div>
                    {!isLogin && <div>
                        <label>Confirm Password</label>
                        <input className='formcontrols' type="password" placeholder="Enter your password" required />
                    </div>} 
                    {isLogin && 
                    <div>
                        <div className='tog'>
                    <label class="switch rememberme">
                     <input type="checkbox"/>
                    <span class="slider round"></span>

                    </label>
                    <p style={{marginBottom:'0px'}}>Remember me <br/></p>
                    </div>
                    <div className='forgotPassword'> <p>Forgot Password?</p></div>
                    </div>
                    }
                    
                    <button type="submit" className='btn loginButton' style={{width:'100%',margin:'20px 0px'}}>{isLogin?"Login":"Register"}</button>

                    {!isLogin && <div className="signupcheckbox">
                        <input
                            class="me-2"
                            type="checkbox"
                            value=""
                            id="registerCheck"
                            aria-describedby="registerCheckHelpText"
                        />
                        <label class="form-check-label" for="registerCheck">
                          Accept Terms and Conditions
                        </label>
                    </div>}
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
