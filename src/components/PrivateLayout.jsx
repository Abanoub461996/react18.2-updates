import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PrivateLayout =()=>{
  let auth= useSelector((state)=>{
    return state.user.loggedIn
  })
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(!auth){
      alert("You need to sign in first")
      navigate("/login")
    }
  },[auth, navigate])
  
  return (
      <>
      {auth&&<Outlet />}
      </>
  );
}
export default PrivateLayout;