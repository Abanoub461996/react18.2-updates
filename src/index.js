import React from 'react';
import ReactDOM from 'react-dom/client';
import {store} from "./utils/redux"
import { Provider } from 'react-redux';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider, Outlet} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
// loader functions
import {getProducts} from "./utils/api"
// LAYOUTS
import RootLayout from './components/RootLayout';
import ProductLayout from './components/ProductLayout';
// STORE COMPONENTS
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Products from './pages/Products/Products';
// USER Components
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
// Error Components
import ErrorLoading from "./components/ErrorLoading"
import ErrorPage from './components/ErrorPage';
// PRIVATE COMPONENTS
import PrivateLayout from './components/PrivateLayout';
import Cart from './pages/Cart/Cart';

function tokenLoader(){
  if(localStorage.getItem("token")){
  return localStorage.getItem("token")
  }else{
    throw new Response("Not Found", { status: 404 });
  }
}
function noLoginToken(){
  if(!localStorage.getItem("token")){
    return "public user"
    }else{
      throw new Response("Not Found", { status: 404 });
    }
}
const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<RootLayout/>} >
          <Route index="true" element ={<Products/>} id="root" loader={getProducts}  errorElement={<ErrorLoading />} />
          <Route path="/product"  element={<ProductLayout/>} >
            <Route index="true" element ={<Products/>} />
            <Route path=":id" element ={<ProductDetails/>} />
          </Route>
          <Route path="/user" element={<ProductLayout/>} loader={noLoginToken} id="public" errorElement={<ErrorPage/>}>
            <Route index="true" element ={<Products/>} />
            <Route path="/user/login" element ={<Login/>} />
            <Route path="/user/register" element ={<Register/>} />
          </Route>
          <Route path="/cart" element={<PrivateLayout/>} loader={tokenLoader} id="private" errorElement={<ErrorPage/>}>
            <Route index element={<Cart/>} />
          </Route>
          <Route path="*" element={<ErrorPage/>} />
        </Route>
))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

