import { useState } from "react";
import NavbarComponent from "./../NavBar/Navbar"
import "./HeaderWrapper.css";

const HeaderWrapperComponent = ({name, age})=>{
	const [logIn, setLogin]=useState(false)
	function toggleLogin(e){
		setLogin(!logIn)
	}
	const numbers = [1, 2, 9, 13, 34].map((elm,i)=><h4 key={elm.toString()}>{elm}</h4>)

	
	return(
		<>
		<NavbarComponent />
		<div className="d-flex" style={{ flexDirection: 'column',alignItems: 'center'}}>
			<h2>{name}</h2>
			{logIn ?
				<h3>user : Abanoub</h3>
			:<h3>u need to login first</h3>
		}
			<div className="d-grid gap-2 d-md-flex">
				<button className="btn btn-primary me-md-2" type="button" onClick={(e)=>{toggleLogin(e)}}>{logIn? "logOut":"logIn"}</button>
			</div>
			{logIn&& numbers}
		</div>
		
		</>
	)

}

export default HeaderWrapperComponent;