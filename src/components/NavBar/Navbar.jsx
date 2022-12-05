import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

// ICONS
import { FaOpencart } from "react-icons/fa";
import './Navbar.css'

function NavbarComponent() { 
  let {user,wishList} = useSelector((state)=>state)
  const handleLogout =()=>{
console.log("ay haga ");
  }
  
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
      {!(user?.loginToken)?
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
          <img className="user-avatar" src={user.userProfile.avatar} alt="user face" />
        </li>
        <li className="nav-item dropdown">
          <button className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
          </button>
          <ul className="dropdown-menu user-drop-down dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><button className="dropdown-item" onClick={handleLogout}>Sign Out</button></li>
          </ul>
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