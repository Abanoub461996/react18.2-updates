import NavbarComponent from './NavBar/Navbar';
import { Outlet } from 'react-router-dom';
function RootLayout({ children }) {
  return (
    <>
      <NavbarComponent />
      <Outlet /><h4>layout root footer</h4>
    </>
  );
}

export default RootLayout;