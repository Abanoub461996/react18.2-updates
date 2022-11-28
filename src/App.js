import logo from './logo.svg';
import './App.css';

// COMPONENTS

import NavbarComponent from './Views/NavBar/Navbar';
import HeaderWrapperComponent from './Views/HeaderWrapper/HeaderWrapper';



function App() {
  return (<>
  <NavbarComponent />
  <HeaderWrapperComponent name="Abanoub" age="25"/>
  </>
    
  );
}

export default App;
