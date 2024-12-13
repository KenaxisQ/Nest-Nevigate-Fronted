import React, {useState,useRef} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import HttpService from "../../../../Services/http";
import { useAuth } from "../../../SignIn/AuthContext";
import { ToastContainer,toast } from "react-toastify";
export const DisplayChangePasswordFields = () => {

  const http = new HttpService();
  const {userData} = useAuth();
  // Validation Schema
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  // Initial Values
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  // Form Submission
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const data = {
        userId:userData.id,
        oldPassword: values.currentPassword,
        newPassword: values.newPassword
      };
      http.put('user/resetPassword', {...data}).then((response)=>{
        if(response.success){
          toast.success("Password updated successfully")
          resetForm();
        }
        else {
          toast.error(response.message);
        }
      })

      

      // Reset form and show success message
      
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Update Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
          <Form className="container pt-4"> 
           <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="currentPassword" placeholder="Password"
                  
                                name="currentPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                 />
                                <label for="floatingPassword"/>
              <label htmlFor="currentPassword">Current Password:</label>
              {touched.currentPassword && errors.currentPassword && (
                    <div className="form-text text-danger error px-2 text-start">
                      {errors.currentPassword}
                    </div>
                  )}
             
              {/* <ErrorMessage name="currentPassword" component="div" className="error" /> */}
            </div>

            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="newPassword" placeholder="Password"
                                name="newPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}/>
                                
              <label htmlFor="newPassword">New Password:</label>
              {touched.newPassword && errors.newPassword && (
                    <div className="form-text text-danger error px-2 text-start">
                      {errors.newPassword}
                    </div>
                  )}
              {/* <ErrorMessage name="newPassword" component="div" className="error" /> */}
            </div>

            <div class="form-floating mb-3">
                                <input type="password" class="form-control" id="confirmPassword" placeholder="Password"
                                name="confirmPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                 />
              <label htmlFor="confirmPassword">Confirm Password:</label>
              {/* <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm new password"
              /> */}
              {/* <ErrorMessage name="confirmPassword" component="div" className="error" /> */}
              {touched.confirmPassword && errors.confirmPassword && (
                    <div className="form-text text-danger error px-2 text-start">
                      {errors.confirmPassword}
                    </div>
                  )}
            </div>

            <button type="submit" className="PropertyNextButton" 
            // disabled={isSubmitting}
            // onClick={handleSubmit}
            >
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer/>
    </div>
  );
};