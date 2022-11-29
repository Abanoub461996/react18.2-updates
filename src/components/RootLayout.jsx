import NavbarComponent from './NavBar/Navbar';

function RootLayout({ children }) {
  return (
    <>
      <NavbarComponent />
      <main> {children}</main>
    </>
  );
}

export default RootLayout;