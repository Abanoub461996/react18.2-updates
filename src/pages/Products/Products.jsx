import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";
// Components

import ProductCard from "./ProductCard/ProductCard";
import "./ProductCard/ProductCard.css"
import axios from "axios";

const Products =()=>{
    const [products, setProducts] = useState([])
    let user = useSelector((state)=>{
        return state.user
    })

    useEffect(()=>{
        async function getProds(){
            const res = await axios.get('https://api.escuelajs.co/api/v1/products');
            setProducts(res.data)
        }
        getProds()
    })
    // setProducts(getProducts())
    // getProducts()
   const [currentPage, setCurrentPage] = useState(1);
   const [prodsPerPage] = useState(15);
 
   // ...
 
   const indexOfLastPost = currentPage * prodsPerPage;
   const indexOfFirstPost = indexOfLastPost - prodsPerPage;
   const totalProds =products.length;
   const currentProds = products.length && products.slice(indexOfFirstPost, indexOfLastPost);

  const handleChange = (e, p) => {
    setCurrentPage(p);
    // _DATA.jump(p);
  };
    return(<>
        {(user?.loginToken) && <div className="alert alert-success text-center">
            Hi {user?.userProfile.name.split(" ")[0]}! let's start shopping our best selling items
        </div>}
        {products.length ? 
        <><div className="prods_container row row-cols-1 row-cols-md-3 g-4 mx-4" style={{ maxWidth: '1440px!important',
            margin: '0 auto !important'}}>
                {currentProds?.map((element) => {
                    return <ProductCard product={element} key={element.id} />;
                })}
            </div>
            <div className="pagination_container">
            <Pagination page={currentPage} count={Math.ceil(totalProds/prodsPerPage)} color="primary" onChange={handleChange}/>
            </div>
            </>
        :
        <div className="d-flex justify-content-center align-items-center"style={{height:"90vh"}}>
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        }
        
    </>)
}
export default Products;