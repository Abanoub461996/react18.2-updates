import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

// ICONS
import { FaOpencart } from "react-icons/fa";
import './Navbar.css'

function NavbarComponent() { 
  let {user,wishList} = useSelector((state)=>state)
  
  
	return (
		<>
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid align-items-baseline  mx-5">
    <Link className="navbar-brand" to="/">React</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link cart-nav-link" to="/cart">
            <FaOpencart className="navbar-cart"/>
            <span className="cart-number">{wishList.length}</span>
          </Link>
        </li>
      </ul>
      {!(user?.loggedIn)?
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/login">login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">register</Link>
        </li>
      </ul>
      :
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <p style={{color:"#4eed86"}} className="mb-0">Hi {user.userProfile.email.slice(0,4)}!</p>
        </li>
      </ul>
      }
      
      
    </div>
  </div>
</nav>
		</>
	  );
}

export default NavbarComponent;