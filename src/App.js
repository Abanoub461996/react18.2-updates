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
        </Route>
        
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
      
  </BrowserRouter>
  </>);
}

export default App;
