import { useState } from "react";
import "./HeaderWrapper.css";
const HeaderWrapperComponent = ({name, age})=>{
	const [logIn, setLogin]=useState(false)
	function toggleLogin(e){
		setLogin(!logIn)
	}
	
	return(
		<>
		<div className="d-flex" style={{ flexDirection: 'column',alignItems: 'center'}}>
			{logIn ?
				<h3>user : Abanoub</h3>
			:<h3>u need to login first</h3>
		}
			<div className="d-grid gap-2 d-md-flex">
				<button className="btn btn-primary me-md-2" type="button" onClick={(e)=>{toggleLogin(e)}}>{logIn? "logOut":"logIn"}</button>
			</div>
		</div>
		
		</>
	)

}

export default HeaderWrapperComponent;