import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup"

import "./Login.css"

const Login= ()=>{
    const formik =useFormik({
        initialValues:{
            email:"",
            password:""
        },
        onSubmit:(values)=>{console.log(values);},
        validationSchema: yup.object({
            email:yup.string().min(6,"Email is too short")     
            .email("Invalid email format")
            .required("Mail is required")
            .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Invalid email format"),
            password:yup.string()
            .required("Password is required")
            .min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol'),
        })
    })
    return(<>
        <div className="Auth-form-container" onSubmit={formik.handleSubmit}>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                 type="email"
                 className={`form-control mt-1 border
                  ${formik.touched.email && formik.errors.email? "border-danger": ""}
                  ${formik.touched.email && !formik.errors.email? "border-success": ""}`}
                 name="email"
                 {...formik.getFieldProps("email")}

              />
            </div>
            {formik.touched.email &&formik.errors.email &&  <div className="alert alert-danger text-center p-1 mt-2">{formik.errors.email}</div>}
           
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className={`form-control mt-1 border
                  ${formik.touched.password && formik.errors.password? "border-danger": ""}
                  ${formik.touched.password && !formik.errors.password? "border-success": ""}`}
                name="password"
                {...formik.getFieldProps("password")}
              />
            </div>
            {formik.touched.password &&formik.errors.password &&  <div className="alert alert-danger text-center p-1 mt-2">{formik.errors.password}</div>}

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div className="text-center mt-2">
              Not registered yet?{" "}
              <Link to="/register" className="link-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
        
      </div>

    </>)
}


export default Login;