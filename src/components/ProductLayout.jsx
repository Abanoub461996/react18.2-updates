import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavBar/Navbar";

function ProductLayout() {
  return (
    <>
    <NavbarComponent />
      <Outlet />
    </>
  );
}

export default ProductLayout;