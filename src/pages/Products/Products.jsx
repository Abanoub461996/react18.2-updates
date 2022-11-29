import {useState, useEffect} from "react"
import ProductCard from "./ProductCard/ProductCard"
const Products =()=>{
    const [products, setProducts] = useState([])
    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=>setProducts(json))
    },[products])
    return(<>
        
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