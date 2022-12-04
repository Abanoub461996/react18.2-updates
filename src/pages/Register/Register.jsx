import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { useDispatch } from "react-redux";
import {loginAction} from "../../utils/redux";
import { useNavigate } from "react-router-dom";


const Register= ()=>{
  const formik =useFormik({
        initialValues:{
          username:"",
          email:"",
          password:"",
          confirmPass:""
        },
        onSubmit:(values)=>{register(values);},
        validationSchema: yup.object({
          username:yup.string()
          .required("Mail is required")
          .min(4,"User name is too short"),
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
          confirmPass:yup.string()
          .required("Confirm your password Again")
          .oneOf([yup.ref('password'), null], 'Must match "password" field value'),
        })
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function getToken(values){
      // specific payload to return a token from the dake reqres api
      let tokenPayload ={
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
      }
      let response = await axios.post("https://reqres.in/api/login", tokenPayload)
       //get token from response from a random api that generates token
       const token = response.data.token

       // check if user is already registered 
       const apiReqBody = Object.assign({}, {...values,role: "customer",
       avatar: "https://api.lorem.space/image/face?w=640&h=480&r=9627",});
       delete apiReqBody.confirmPass;
       let userExists=true;
        axios.get('https://api.escuelajs.co/api/v1/users').then((res)=>{
          userExists = res.data.some((el)=>{
            return el.email === apiReqBody.email})
            console.log("after the loop",userExists);

            //  Add the new user to the users collection
            if(!userExists){
              axios.post('https://api.escuelajs.co/api/v1/users',apiReqBody).then(res=>{console.log(res);})
            }
        })
      
      //  store token in the global state
       let loginActionPayload = {
        loginToken:token,
        values : values
      }
       dispatch(loginAction(loginActionPayload))
      //redirect user to home page
      navigate("/")
 };
    const register = (values)=>{
      getToken(values)
    }
    return(<>
       <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={formik.handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign UP</h3>
          
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              name="username"
              {...formik.getFieldProps("username")}
              className={`form-control mt-1 border
                  ${formik.touched.username && formik.errors.username? "border-danger": ""}
                  ${formik.touched.username && !formik.errors.username? "border-success": ""}`}
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