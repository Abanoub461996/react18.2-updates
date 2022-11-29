import { BrowserRouter, Route, Routes } from 'react-router-dom';
// COMPONENTS
import RootLayout from './components/RootLayout';
import ProductLayout from './components/ProductLayout'
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Products from './pages/Products/Products';
import ErrorPage from './components/ErrorPage';


// Modules 

function App() {
  return (<>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout/>} >
          <Route index="true" element ={<Products/>} />
          
        </Route>
        <Route path="/product"  element={<ProductLayout/>} >
            <Route index="true" element ={<Products/>} />
            <Route path=":id" element ={<ProductDetails/>} />
        </Route>
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
      
  </BrowserRouter>
  </>);
}

export default App;
