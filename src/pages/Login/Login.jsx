import { Link ,useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import axios from 'axios';
import {loginAction} from "../../utils/redux";
import * as yup from "yup"

import "./Login.css"
import { useState } from "react";

const Login= ()=>{
  const [apiValid,setApiValid] = useState(true)
    const formik =useFormik({
        initialValues:{
            email:"",
            password:""
        },
        onSubmit:(values)=>{logIn(values);},
        validationSchema: yup.object({
            email:yup.string().min(6,"Email is too short")     
            .email("Invalid email format")
            .required("Mail is required")
            .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Invalid email format"),
            password:yup.string()
            .required("Password is required")
            .min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^w]/, 'Password requires a symbol'),
        })
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logIn = (values)=>{
      logInUser(values)
      
    }
    async function logInUser(values){
      
      //  store token in the global state

      // Check user have an account 
      await axios.get('https://api.escuelajs.co/api/v1/users').then((res)=>{
        let user = res.data && res.data.filter((el)=>el.email === values.email)
        if(user.length){
          
          if(user[0].password === values.password){
            axios.post("https://api.escuelajs.co/api/v1/auth/login", values, {"content-type":"application/json"}).then(
            (res)=>{
              let loginActionPayload = {
                loginToken:res.data.access_token,
                values : user[0]
              }
              delete loginActionPayload.values.password;
              dispatch(loginAction(loginActionPayload));
              localStorage.setItem("token",res.data.access_token)
            }).catch(err=>{console.log(err.message);})
            navigate("/")
          }else {
            setApiValid(false)
            formik.values.password = "";
          }
        }else{
          var userRes = window.confirm("you don't have an Account, Do you want to create a new account ?");
                if(userRes){
                  navigate("/user/register")
                }else{
                  navigate("/")
                }
        }
      })
 };

    return(<>
        <div className="Auth-form-container" onSubmit={formik.handleSubmit}>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            {(!apiValid)&&  <div className="alert alert-danger text-center p-1 mt-2">Wrong Password, try again!</div>}
            
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
                  ${(formik.touched.password && formik.errors.password)? "border-danger": ""}
                  ${formik.touched.password && !formik.errors.password? "border-success": ""}`}
                name="password"
                {...formik.getFieldProps("password")}
              />
            </div>
            {(formik.touched.password &&formik.errors.password)&&  <div className="alert alert-danger text-center p-1 mt-2">{formik.errors.password}</div>}

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className={`btn btn-primary submit-btn ${(!(formik.dirty)|| !(formik.isValid)) && "disabled"}`}>
                Submit
              </button>
            </div>
            <div className="text-center mt-2">
              Not registered yet?{" "}
              <Link to="/user/register" className="link-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>

    </>)
}


export default Login;