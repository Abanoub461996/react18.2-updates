import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";

import { MdOutlineFavorite , MdOutlineFavoriteBorder} from "react-icons/md";

const ProductDetails = ()=>{
    const [product, setProduct] = useState()
    const [fav, setFav] = useState(false)

    let {id} =useParams()

    useEffect(()=>{
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res=>res.json())
        .then(json=>setProduct(json))
    },[id])

    function toggleFav(){
        setFav(!fav)
    }
    return (<>
    {product?
    <div className="card m-3">
    <div className="row g-0">
        <div className="col-md-4">
        <img src={product.image}  style={{maxHeight : "80%"}} className="img-fluid rounded-start m-3 me-1" alt="..." />
        </div>
        <div className="col-md-8">
        <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

            {fav?
            <MdOutlineFavorite style={{fontSize: '30px',color: 'red', cursor:"pointer"}} onClick={toggleFav}/>
            :
            <MdOutlineFavoriteBorder style={{fontSize: '30px',color: 'wheat', cursor:"pointer"}} onClick={toggleFav}/>
            }
        </div>
        </div>

        
    </div>
    </div>
    : 
    <div className="d-flex">
<div className="spinner-grow text-primary m-auto" role="status" style={{}}>
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
    
    
    }
    
    </>)
}

export default ProductDetails;