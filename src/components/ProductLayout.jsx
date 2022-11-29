import { Outlet } from "react-router-dom";

function ProductLayout() {
  return (
    <>
    <div className="alert alert-info " role="alert">
      Order now and get your package delivered to your door step in 24 hours
    </div>
      <Outlet />

    </>
  );
}

export default ProductLayout;