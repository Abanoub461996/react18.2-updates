import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/NavBar/Navbar';
// COMPONENTS
import ProductLayout from './components/ProductLayout'
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Products from './pages/Products/Products';


// Modules 

function App() {
  return (<>
  <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Products/>} />
        <Route path="/product"  element={<ProductLayout/>} >
          <Route index="true" element ={<Products/>} />
          <Route path=":id" element ={<ProductDetails/>} />

        </Route>
      </Routes>
      
  </BrowserRouter>
  </>);
}

export default App;
