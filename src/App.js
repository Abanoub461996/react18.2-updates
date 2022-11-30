// LAYOUTS
import RootLayout from './components/RootLayout';
import ProductLayout from './components/ProductLayout';
// STORE COMPONENTS
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Products from './pages/Products/Products';
// USER Components
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ErrorPage from './components/ErrorPage';
// PRIVATE COMPONENTS
import PrivateLayout from './components/PrivateLayout';
import Cart from './pages/Cart/Cart';
// Modules 
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {
  return (<>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout/>} >
          <Route index="true" element ={<Products/>} />
          <Route path="/product"  element={<ProductLayout/>} >
            <Route index="true" element ={<Products/>} />
            <Route path=":id" element ={<ProductDetails/>} />
          </Route>
          <Route path="/login" element ={<Login/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/cart" element={<PrivateLayout/>}>
            <Route index element={<Cart/>} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
      
  </BrowserRouter>
  </>);
}

export default App;
