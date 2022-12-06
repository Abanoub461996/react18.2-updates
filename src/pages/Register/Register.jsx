import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { useDispatch } from "react-redux";
import {registerAction} from "../../utils/redux";
import { useNavigate } from "react-router-dom";
// API

const Register= ()=>{
  const formik =useFormik({
        initialValues:{
          name:"",
          email:"",
          password:"",
          confirmPass:""
        },
        onSubmit:(values)=>{register(values);},
        validationSchema: yup.object({
          name:yup.string()
          .required("Mail is required")
          .min(4,"User name is too short"),
          email:yup.string().min(6,"Email is too short")     
          .email("Invalid email format")
          .required("Mail is required")
          .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Invalid email format"),
          password:yup.string()
          .required("Password is required")
          .min(8, 'Password must be 8 characters long')
          .matches(/[0-9]/, 'Password requires a number')
          .matches(/[a-z]/, 'Password requires a lowercase letter')
          .matches(/[A-Z]/, 'Password requires an uppercase letter'),
          // .matches(/[^\w]/, 'Password requires a symbol'),
          confirmPass:yup.string()
          .required("Confirm your password Again")
          .oneOf([yup.ref('password'), null], 'Must match "password" field value'),
        })
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function register(values){
      // specific payload to return a token from the dake reqres api
       // check if user is already registered 
       const apiReqBody = Object.assign({}, {...values,role: "customer",
       avatar: "https://api.lorem.space/image/face?w=640&h=480&r=9627",});
       delete apiReqBody.confirmPass;
       let userExists=true;
        axios.get('https://api.escuelajs.co/api/v1/users').then((res)=>{
          userExists = res.data.some((el)=>{
            return el.email === apiReqBody.email})
            //  Add the new user to the users collection
            if(!userExists){
              // Register and post a new user to the API
              let regDetails =Object.assign({role: "customer",
              avatar: "https://api.lorem.space/image/face?w=640&h=480&r=9136"},values)
              delete regDetails.confirmPass
              axios.post("https://api.escuelajs.co/api/v1/users", regDetails).then(
              )
              // get token to the new user registered
              let tokenPayload ={
                "email": values.email,
                "password": values.password
              }
              axios.post("https://api.escuelajs.co/api/v1/auth/login", tokenPayload, {"content-type":"application/json"}).then(
                (res)=>{
                  // Handle the global state register action 
                  let regActionPayload = {
                    values: regDetails,
                    loginToken :res.data.access_token,
                  }
                  delete regActionPayload.values.password;
                  dispatch(registerAction(regActionPayload));
                })
                .catch(err=>{console.log(err.message);})
                navigate("/")
            }else{
              var userRes = window.confirm("you already have an Account, Do you want to sign in ?");
              if(userRes){
                navigate("/login")
              }else{
                navigate("/")
              }
            }
        })
 };
    return(<>
       <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={formik.handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign UP</h3>
          
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              {...formik.getFieldProps("name")}
              className={`form-control mt-1 border
                  ${formik.touched.name && formik.errors.name? "border-danger": ""}
                  ${formik.touched.name && !formik.errors.name? "border-success": ""}`}
            />
          </div>
          {formik.touched.username &&formik.errors.username &&  <div className="alert alert-danger text-center p-1 mt-2">{formik.errors.username}</div>}

          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              {...formik.getFieldProps("email")}
              className={`form-control mt-1 border
                  ${formik.touched.email && formik.errors.email? "border-danger": ""}
                  ${formik.touched.email && !formik.errors.email? "border-success": ""}`}
            />
          </div>
          {formik.touched.email &&formik.errors.email &&  <div className="alert alert-danger text-center p-1 mt-2">{formik.errors.email}</div>}

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              {...formik.getFieldProps("password")}
              className={`form-control mt-1 border
                  ${formik.touched.password && formik.errors.password? "border-danger": ""}
                  ${formik.touched.password && !formik.errors.password? "border-success": ""}`}
            />
          </div>
          {formik.touched.password &&formik.errors.password &&  <div className="alert alert-danger text-center p-1 mt-2">{formik.errors.password}</div>}

          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPass"
              {...formik.getFieldProps("confirmPass")}
              className={`form-control mt-1 border
                  ${formik.touched.confirmPass && formik.errors.confirmPass? "border-danger": ""}
                  ${formik.touched.confirmPass && !formik.errors.confirmPass? "border-success": ""}`}
            />
          </div>
          {formik.touched.password &&!formik.errors.password && formik.touched.confirmPass &&formik.errors.confirmPass &&  <div className="alert alert-danger text-center p-1 mt-2">{formik.errors.confirmPass}</div>}
          {formik.touched.confirmPass && (!formik.touched.password  || formik.errors.password) &&  <div className="alert alert-danger text-center p-1 mt-2">Confirm a valid password first</div>}

          <div className="d-grid gap-2 mt-3">
          <button type="submit" className={`btn btn-primary submit-btn ${(!(formik.dirty)|| !(formik.isValid)) && "disabled"}`}>
              Submit
            </button>
          </div>
          <div className="text-center mt-2">
            Already registered?{" "}
            <Link to="/login"  className="link-primary">
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
    </>)
}
export default Register;