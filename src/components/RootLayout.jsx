import NavbarComponent from './NavBar/Navbar';
import { Outlet } from 'react-router-dom';
function RootLayout({ children }) {
  return (
    <>
      <NavbarComponent />
      <Outlet/>
    </>
  );
}

export default RootLayout;