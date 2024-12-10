/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import "./LoginRegister.css";
import OtpInput from "./OtpInput";
import SlideSwitch from "./SlideSwitch";
import HttpService from "../../Services/http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OtpModal } from "./OtpModal";
import { useAuth } from "./AuthContext";
export const Login = ({ setIsAuthenticated }) => {
  // useEffect(() => {
  //   sessionStorage.clear();
  //   localStorage.clear();
  // }, []);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [otpVerification, setOtpVerification] = useState(false);
  const [userIdentifier, setUserIdentifier] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState(null);
  const [googleData, setGoogleData] = useState(null);
  const [resendOtp, setResendOtp] = useState(false);
  const [timer, setTimer] = useState(300);
  const [emailVerified, setEmailVerified] = useState(false);
  const [userAction, setUserAction] = useState({
    action: "Login",
    through: "Identifier/Password",
  });
 const {login} = useAuth();
  const modal1Ref = useRef(null);
    const openOtpModal = (values) => {

        setFormData(values);
        const modal = new window.bootstrap.Modal(modal1Ref?.current);
        modal.show();
    }
  const [resetPassword, setResetPassword] = useState(false);
  const [isRemembered, setIsRemembered] = useState(false);
  const handleToggle = (checked) => {
    setIsRemembered(checked);
    console.log(checked);
  };

  const apicb = new HttpService();
  const initialValues = {
    emailOrPhone: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    name: "",
    profilePicture: null,
    otp: otp,
    termsAccepted: false,
  };

  const getRequiredFields = () => {
    if (userAction.action === "Register") {
      return ["name", "email", "password", "confirmPassword", "phone"];
    } else if (
      userAction.action === "Register" &&
      otpSent &&
      userAction.through !== "OTP"
    ) {
      return ["email"];
    } else if (
      userAction.action === "Login" &&
      userAction.through === "Identifier/Password"
    ) {
      return ["emailOrPhone", "password"];
    } else if (
      userAction.action === "Login" &&
      userAction.through === "OTP" &&
      !otpSent
    ) {
      return ["emailOrPhone"];
    } else if (
      userAction.action === "Login" &&
      userAction.through === "OTP" &&
      otpSent
    ) {
      return ["emailOrPhone"];
    } else if (userAction.action === "ForgotPassword" && !otpSent) {
      return ["emailOrPhone"];
    } else if (userAction.action === "ForgotPassword" && otpSent) {
      return ["emailOrPhone", "password", "confirmPassword"];
    } else {
      return ["name", "email", "password", "confirmPassword", "phone"];
    }
  };

  const validationSchema = Yup.object().shape(
    Object.entries({
      emailOrPhone: Yup.string().test(
        "email-or-phone",
        "Invalid email or phone number format",
        (value) => {
          if (!value) return true;
          const isEmail = Yup.string().email().isValidSync(value);
          const isPhoneNumber = /^\d{10}$/.test(value);
          return isEmail || isPhoneNumber;
        }
      ),
      email: Yup.string().email("Invalid email format"),
      phone: Yup.string().matches(/^\d{10}$/, "Must be a valid phone number"),
      password: Yup.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Passwords must match"
      ),
      name: Yup.string(),
      termsAccepted:
        userAction.action === "Register"
          ? Yup.boolean().oneOf([true], "You must accept the terms")
          : Yup.boolean(),
    }).reduce((acc, [field, validation]) => {
      const requiredFields = getRequiredFields();
      if (requiredFields.includes(field)) {
        acc[field] = validation.required(`${field} is required`);
      } else {
        acc[field] = validation;
      }
      return acc;
    }, {})
  );

  const handleOtpComplete = (otpValue) => {
    setOtp(otpValue);
    console.log(otpValue);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    
    if(userAction.action === "Login" )
    {
        toast
        .promise(
            apicb.post('auth/validateGoogleAuthLogin', {token: credentialResponse?.credential}),
          {
            pending: "Logging In...",
          }
        ).then((response) => {
            if (response.success) {
              toast.success(response.message, {
                position: "top-center",
              });
              setUserAction({
                action: "Login",
                through: "Google",
              });
              localStorage.setItem("AUTH_TOKEN", response?.data?.access_token);
              sessionStorage.setItem("AUTH_TOKEN", response?.data?.access_token);
              const decodedtoken = jwtDecode(credentialResponse?.credential);
              setUserIdentifier(decodedtoken?.email);
              login(decodedtoken?.email, () => navigate('/'),isRemembered, response?.data?.access_token);
              setEmailVerified(true);
              // setIsAuthenticated(true);
    } else {
        toast.error(response.message, {
          position: "top-center",
        });
      }
      console.log(response);
    });
  console.log('decodedres', credentialResponse);

        // const tokenFromApi = apicb.post('auth/validateGoogleAuthLogin', {token: credentialResponse?.credential});
        // if(tokenFromApi?.success)
        // {

        // }
    } else{
        const decodedResponse = jwtDecode(credentialResponse?.credential);
        console.log('decodedres', decodedResponse);
        return decodedResponse;
        // setGoogleData(decodedResponse);
        // setIsLogin(false);
        // console.log('googleData', googleData )
    }

  };

  const startTimer = () => {
    setTimer(300);
    setResendOtp(false);
  };

  useEffect(() => {
    let interval;
      if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendOtp(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const resendOTP = (values) => {
    if (userAction.action === "ForgotPassword") {
      apicb
        .post(
          "auth/forgotPassword",
          {
            identifier: values?.emailOrPhone,
          },
          false,
          true
        )
        .then((response) => {
          response.success
            ? toast.success(response.message)
            : toast.error(response.message);
        });
    } else if (userAction.action === "Login") {
                     apicb
        .post(
          "auth/loginWithOTP",
          {
            identifier: values?.emailOrPhone,
          },
          false,
          true
        )
        .then((response) => {
          response.success
            ? toast.success(response.message)
            : toast.error(response.message);
        });
    }
  };

  const verifyOtp = () => {
    toast
        .promise(
            apicb.post('auth/validateUserEmail', {identifier: formData?.email, verificationCode: otp}),
          {
            pending: "Sending OTP for Verification...",
          }
        ).then((response) => {
            if (response.success) {
              toast.success(response.message, {
                position: "top-center",
              });
              setUserAction({
                action: "Register",
                through: "userDetails",
              });
              setEmailVerified(true);
            } else {
              toast.error(response.message, {
                position: "top-center",
              });
            }
            console.log(response);
          });
  }
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    console.log(userAction);
    
    setUserIdentifier(values?.emailOrPhone);
    if (
      userAction.action === "Register" &&
      userAction.through === "userDetails"
    ) {
      toast
        .promise(
          apicb.post(
            "auth/register",
            {
              email: values?.email,
              password: values?.password,
              phone: values?.phone,
              name: values?.name,
              profilePicture: ":)",
            },
            false,
            true
          ),
          {
            pending: "Sending OTP for Verification...",
          }
        )
        .then((response) => {
          if (response.success) {
            toast.success(response.message, {
              position: "top-center",
            });
            setIsAuthenticated(true);
          } else {
            toast.error(response.message, {
              position: "top-center",
            });
          }
          console.log(response);
        });
    } else if (
      userAction.action === "Login" &&
      userAction.through === "Identifier/Password"
    ) {
      toast
        .promise(
          apicb.post(
            "auth/login",
            { identifier: values?.emailOrPhone, password: values?.password },
            false,
            true
          ),
          { pending: "Logging in...", position: "top-center" }
        )
        .then((response) => {
          if (response.success) {
            toast.success(response.message, {
              position: "top-center",
            });
            // localStorage.removeItem("AUTH_TOKEN");
            // localStorage.removeItem("AUTH_TOKEN");
            isRemembered
              ? localStorage.setItem("AUTH_TOKEN", response.data.access_token)
              : sessionStorage.setItem(
                  "AUTH_TOKEN",
                  response.data.access_token
                );
            isRemembered
              ? localStorage.setItem(
                  "REFRESH_TOKEN",
                  response.data.refresh_token
                )
              : sessionStorage.setItem(
                  "REFRESH_TOKEN",
                  response.data.refresh_token
                );
                login(values?.emailOrPhone, () => navigate('/'), isRemembered, response?.data?.access_token);

            // setIsAuthenticated(true);
          } else {
            toast.error("Username/password Incorrect", {
              position: "top-center",
            });
            console.log(response.message);
          }
        });
    } else if (
      userAction.action === "Login" &&
      userAction.through === "OTP" &&
      otpSent
    ) {
      if (otp.length < 6) {
        toast.error("Please Enter Valid 6-DIGIT OTP");
        return;
      }
      toast
        .promise(
          apicb.post(
            "auth/validateEmailOtpLogin",
            {
              identifier: values?.emailOrPhone,
              verificationCode: otp,
            },
            false,
            true
          ),
          {
            pending: "Validating User..",
          }
        )
        .then((data) => {
          if (data.success) {
            toast.success(data.message, {
              position: "top-center",
            });
            sessionStorage.setItem("AUTH_TOKEN", data.data.access_token);
            sessionStorage.setItem("REFRESH_TOKEN", data.data.refresh_token);
            login(values?.emailOrPhone, () => navigate('/'), isRemembered, data?.data?.access_token);
            // setIsAuthenticated(true);
          } else {
            toast.error(data.message + " ,Enter Valid OTP!!! ", {
              position: "top-center",
            });
          }
          console.log(data);
        });
    } else if (userAction.action === "Login" && userAction.through === "OTP") {
      toast
        .promise(
          apicb.post("auth/loginWithOTP", {
            identifier: values?.emailOrPhone,
          }),
          {
            pending: "Sending OTP ...",
          }
        )
        .then((data) => {
          if (data.success) {
            setOtpSent(true);
            toast.success(data.message, {
              position: "top-center",
            });
            setOtpSent(true);
            startTimer();
          } else {
            toast.error("Please Enter Valid Username, " + data.message, {
              position: "top-center",
            });
          }
        });
    } else if (
      userAction.action === "ForgotPassword" &&
      userAction.through === "OTP" &&
      !otpSent
    ) {
      toast
        .promise(
          apicb.post(
            "auth/forgotPassword",
            {
              identifier: values?.emailOrPhone,
            },
            false,
            true
          ),
          {
            pending: "Sending OTP...",
          }
        )
        .then((data) => {
          if (data.success) {
            toast.success(data.message, {
              position: "top-center",
            });
            setOtpSent(true);
            startTimer();
          } else
            toast.error(
              "Please Enter Valid User Identifier(Email/Phone), " +
                data.message,
              {
                position: "top-center",
              }
            );
        });
    } else if (
      userAction.action === "ForgotPassword" &&
      userAction.through === "OTP" &&
      otpSent
    ) {
      if (otp.length < 6) {
        toast.error("Please Enter Valid 6-DIGIT OTP");
        return;
      }
      toast
        .promise(
          apicb.put(
            "auth/verifyAndResetPassword",
            {
              identifier: values?.emailOrPhone,
              code: otp,
              password: values?.password,
            },
            false,
            true
          ),
          {
            pending: "Resetting Password..",
          }
        )
        .then((data) => {
          if (data.success) {
            toast.success(data.message, {
              position: "top-center",
            });
            setOtpSent(false);
            setUserAction({
              action: "Login",
              through: "Identifier/Password",
            });
            login(userIdentifier, () => navigate('/'), isRemembered, data?.data?.access_token);
          } else
            toast.error(
              "Please Enter Valid User Identifier(Email/Phone), " +
                data.message,
              {
                position: "top-center",
              }
            );
        });
      console.log("Password Reset Successful!");
    }
    else if(userAction.action==="Verify"&&userAction.through==="OTP"&&otpSent){
        if (otp.length < 6) {
          toast.error("Please Enter Valid 6-DIGIT OTP");
          return;
        }
        toast
          .promise(
            apicb.post(
              "auth/verify",
              {
                identifier: values?.email,
                verificationCode: otp,
              },
              false,
              true
            ),
            {
              pending: "User Verification in Progress..",
            }
          )
          .then((data) => {
            if (data.success) {
              toast.success(data.message, {
                position: "top-center",
              });
              setOtpSent(false);
              setUserAction({
                action: "Login",
                through: "Identifier/Password",
              });
            } else
              toast.error(
                "Please Enter Valid OTP, " +
                  data.message,
                {
                  position: "top-center",
                }
              );
          });
    }

    console.log(values);
    setSubmitting(false);
  };

  const getSubmitButtonText = () => {
    if (
      (userAction.action === "Login" ||
        userAction.action === "ForgotPassword") &&
      userAction.through === "OTP" &&
      otpSent
    )
      return "Verify OTP";
    else if (
      (userAction.action === "Login" || "ForgotPassword") &&
      userAction.through === "OTP"
    )
      return "Send OTP";
    else if (userAction.action === "Login") return "Login";
    else if (userAction.action === "Verify") return "Verify and Register";
    else return "Register";
  };

  const sendOtpToUser = (values) => {
    toast
        .promise(
        apicb.post('auth/verify', {identifier: values?.email}),
          {
            pending: "Sending OTP for Verification...",
          }
        )
        .then((response) => {
          if (response.success) {
            toast.success(response.message, {
              position: "top-center",
            });
            openOtpModal(values);
            // setUserAction({
            //   action: "Verify",
            //   through: "OTP",
            // });
            setOtpSent(true);
            startTimer();
          } else {
            toast.error(response.message, {
              position: "top-center",
            });
          }
          console.log(response);
        });
    // const isVerified = await apicb.post('auth/verify', {identifier: formData?.email});
    // isVerified?.success &&

  }
//   useEffect(() => {
//     console.log(userAction);
//     console.log("OTP SENT: ", otpSent);
//   }, [userAction, setOtpSent]);

  return (
    <div
      className={`loginRegisterWrapper d-flex justify-content-${
        userAction.action === "Login" || userAction.action === "ForgotPassword"
          ? "end"
          : "start"
      }`}
    >
      <div className="formContainer">
        <div className="logosection">
          <h4>Nest Navigate</h4>
          {(userAction.action === "Login" ||
            userAction.action === "ForgotPassword") && (
            <div className="welcome_msg d-flex justify-content-between p-3 mt-10">
              <h6>Nice to see you again 👋</h6>
              <a
                onClick={() => {
                  setUserAction({
                    action: "Login",
                    through:
                      userAction.through === "OTP"
                        ? "Identifier/Password"
                        : "OTP",
                  });
                  setOtpSent(false);
                }}
                className="py-2"
                style={{ cursor: "pointer" }}
              >
                {userAction.through === "OTP"
                  ? "Login with Password"
                  : "Login with OTP"}
              </a>
            </div>
          )}
          {userAction.action === "Register" && (
            <h6 className="welcome_register">Welcome to Nest Navigate</h6>
          )}
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit} // Formik will handle form submission
        >
          {({
            handleChange,
            handleBlur,
            touched,
            errors,
            isSubmitting,
            setFieldValue,
            values,
          }) => (
            <Form>
              {userAction.action === "Register" && (
                <div className="inputboxWrapper d-block text-start">
                  <label htmlFor="name" className="p-2">
                    Name
                  </label>
                  <input
                    style={{ fontStyle: "normal" }}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-100 rounded-3"
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <div className="form-text text-danger error px-2">
                      {errors.name}
                    </div>
                  )}
                </div>
              )}
              {(userAction.action === "Register" ||
                userAction.action === "Verify") && (
                <div className="inputboxWrapper d-block text-start">
                  <label htmlFor="email" className="p-2">
                    Email
                  </label>
                  <input
                    style={{ fontStyle: "normal" }}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-100 rounded-3"
                    disabled={(otpSent && userAction.action === "Verify")}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <div className="form-text text-danger error px-2">
                      {errors.email}
                    </div>
                  )}
                </div>
              )}
              {((userAction.action === "Register") && (!errors.email) && (!emailVerified) && (values?.email)) && (
                <>
                    <a href="#" onClick={() => {sendOtpToUser(values);}} className="d-block text-end">Verify</a>       
                  </>
                
            )}
            {(userAction.action === "Register") && (emailVerified &&  (((!resendOtp) ? (
                        <div className="resendOTPWrapper d-flex justify-content-end">
                          <span className="resendOTPTimer">
                            Resend available in {Math.floor(timer / 60)}:
                            {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
                          </span>
                        </div>
                      ) : (
                        <div className="resendOTPWrapper d-flex justify-content-end">
                          <a
                            className="resendOTP"
                            onClick={() => {
                              resendOTP(values);
                              startTimer();
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            Resend OTP
                          </a>
                        </div>
                      ))))}
                      {touched.otp && errors.otp && (
                        <div className="form-text text-danger error px-2">
                          {errors.otp}
                        </div>
                      )}
              {userAction.action === "Register" && (
                <div className="inputboxWrapper d-block text-start">
                  <label htmlFor="phone" className="p-2">
                    Phone Number
                  </label>
                  <input
                    style={{ fontStyle: "normal" }}
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phonenumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-100 rounded-3"
                  />
                  {touched.phone && errors.phone && (
                    <div className="form-text text-danger error px-2">
                      {errors.phone}
                    </div>
                  )}
                </div>
              )}
              {(userAction.action === "Login" ||
                userAction.action === "ForgotPassword") && (
                <div className="inputboxWrapper d-block text-start">
                  <label htmlFor="emailOrPhone" className="p-2">
                    Username
                  </label>
                  <input
                    style={{ fontStyle: "normal" }}
                    type="text"
                    name="emailOrPhone"
                    id="emailOrPhone"
                    placeholder="Email or Phonenumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-100"
                    disabled={otpSent}
                  />
                  {touched.emailOrPhone && errors.emailOrPhone && (
                    <div className="form-text text-danger error px-2">
                      {errors.emailOrPhone}
                    </div>
                  )}
                </div>
              )}
              {((userAction.action === "Login" &&
                userAction.through === "Identifier/Password") ||
                userAction.action === "Register" ||
                (userAction.action === "ForgotPassword" && otpSent)) && (
                <div className="inputboxWrapper d-block text-start">
                  <label htmlFor="password" className="p-2">
                    Password
                  </label>
                  <input
                    style={{ fontStyle: "normal" }}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-100"
                  />
                  {touched.password && errors.password && (
                    <div className="form-text text-danger error px-2">
                      {errors.password}
                    </div>
                  )}
                </div>
              )}
              {(userAction.action === "Register" ||
                (userAction.action === "ForgotPassword" && otpSent)) && (
                <div className="inputboxWrapper d-block text-start">
                  <label htmlFor="confirmPassword" className="p-2">
                    Confirm Password
                  </label>
                  <input
                    style={{ fontStyle: "normal" }}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-100"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="form-text text-danger error px-2">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              )}
              {userAction.action === "Register" && (
                <div className="termsAdConditions text-start pt-2 px-2">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />{" "}
                  Accept terms & Conditions
                </div>
              )}
              {touched.termsAccepted && errors.termsAccepted && (
                <div className="form-text text-danger error px-2">
                  {errors.termsAccepted}
                </div>
              )}
              {(userAction.action === "Verify" ||
                ((userAction.action === "Login" ||
                  userAction.action === "ForgotPassword") &&
                  userAction.through === "OTP" &&
                  otpSent)) && (
                <div className="inputboxWrapper d-block text-start mt-3">
                  {userAction.action !== "Verify" && (<><label htmlFor="otp" className="p-2">
                                      OTP
                                  </label><OtpInput onComplete={handleOtpComplete} /></>)}
                  {!resendOtp ? (
                    <div className="resendOTPWrapper d-flex justify-content-end">
                      <span className="resendOTPTimer">
                        Resend available in {Math.floor(timer / 60)}:
                        {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
                      </span>
                    </div>
                  ) : (
                    <div className="resendOTPWrapper d-flex justify-content-end">
                      <a
                        className="resendOTP"
                        onClick={() => {
                          resendOTP(values);
                          startTimer();
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        Resend OTP
                      </a>
                    </div>
                  )}
                  {touched.otp && errors.otp && (
                    <div className="form-text text-danger error px-2">
                      {errors.otp}
                    </div>
                  )}
                </div>
              )}
              {userAction.action === "Login" &&
                userAction.through === "Identifier/Password" && (
                  <div className="loginHelpers d-flex justify-content-between align-items-end">
                    <SlideSwitch onToggle={handleToggle} />
                    <a
                      className="forgotPassword"
                      onClick={() => {
                        setUserAction({
                          action: "ForgotPassword",
                          through: "OTP",
                        });
                        setFieldValue("password", "");
                        setFieldValue("confirmPassword", "");
                      }}
                    >
                      Forgot Password?
                    </a>
                  </div>
                )}
              <button
                className="text-white rounded mt-3 bg_1F4B43 w-100"
                type="submit"
                disabled={isSubmitting}
                onClick={() => {
                  console.log(errors);
                }}
              >
                {getSubmitButtonText()}
              </button>
              <div className="googleSigninAndSignup">
                <div className="googleSignin d-flex justify-content-center py-2 mt-1">
                  <GoogleLogin
                    className="w-100"
                    onSuccess={(credentialResponse) => {
                        const response = handleGoogleSuccess(credentialResponse);
                        console.log('respomse', response);
                        setFieldValue(
                            'name',`${response?.given_name} ${response?.family_name}`
                          );
                        setFieldValue('email',response?.email
                        )
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>
                {(userAction.action === "Login" ||
                  userAction.action === "ForgotPassword") && (
                  <p>
                    Don't have an account?{" "}
                    <a
                      className="signuplink"
                      onClick={() =>
                        setUserAction({
                          action: "Register",
                          through: "userDetails",
                        })
                      }
                    >
                      Signup now
                    </a>
                  </p>
                )}
                {userAction.action === "Register" && (
                  <p>
                    Already have an account?{" "}
                    <a
                      className="signuplink"
                      onClick={() =>
                        setUserAction({
                          action: "Login",
                          through: "Identifier/Password",
                        })
                      }
                    >
                      SignIn now
                    </a>
                  </p>
                )}
              </div>
            </Form>
          )}
        </Formik>
        <OtpModal modal1Ref={modal1Ref} handleOtpComplete={handleOtpComplete} email={formData?.email} verifyOtp={verifyOtp}/>
        <ToastContainer />
      </div>
    </div>
  );
};
