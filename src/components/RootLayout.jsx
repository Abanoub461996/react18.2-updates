import NavbarComponent from './NavBar/Navbar';
import { Outlet } from 'react-router-dom';
function RootLayout({ children }) {
  return (
    <>
      <NavbarComponent />
      <div style={{maxWidth:'1440px',margin:'20px auto'}}>

      <Outlet/>
      </div>
    </>
  );
}

export default RootLayout;