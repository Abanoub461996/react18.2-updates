import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateLayout =()=>{
  let auth= useSelector((state)=>{
    return state.user.loginToken
  })

  function hasJWT() {
       let flag = false;
       //check user has JWT token
       auth? flag=true : flag=false
       return flag
   }
  return (
      <>
      {hasJWT() ? <Outlet /> : <Navigate to="/login" replace />}
      </>
  );
}
export default PrivateLayout;