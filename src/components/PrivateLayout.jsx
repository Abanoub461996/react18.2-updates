import { Outlet, Navigate, useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateLayout =()=>{
  const token = useRouteLoaderData("private")
  console.log(token);
  return (
      <>
      <Outlet/>
      </>
  );
}
export default PrivateLayout;