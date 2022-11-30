import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
// Components

import ProductCard from "./ProductCard/ProductCard"
const Products =()=>{
    const [products, setProducts] = useState([])
    let user = useSelector((state)=>{
        return state.user
    })

    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>setProducts(json))
    })
    return(<>
        {(user?.loggedIn) && <div className="alert alert-success text-center">
            Hi {user?.userProfile.email.slice(0,4)}! let's start shopping our best seeling items
        </div>}
        {products.length ? 
        <div className="row row-cols-1 row-cols-md-3 g-4 mx-4">
            {products?.map((element)=>{
            return <ProductCard product={element} key={element.id}/>
        })}
        </div>
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