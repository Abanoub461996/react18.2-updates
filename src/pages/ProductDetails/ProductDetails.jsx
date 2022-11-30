import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { useSelector } from "react-redux";

// ICONS
import { MdOutlineFavorite , MdOutlineFavoriteBorder} from "react-icons/md";

const ProductDetails = ()=>{
    const [fav, setFav] = useState(false)
    const [product, setProduct]=useState({})
    let {id} =useParams()

    let prod = useSelector((state)=>{
        return state.slectedItem
    })
    
    useEffect(()=>{
        if(prod?.id !== parseInt(id)){
            fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=>setProduct(json))
        }else{
            setProduct(prod)
        }
    },[id])

    function toggleFav(){
        setFav(!fav)
    }
    return (<>
    {product.id?
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
        <div className="d-flex justify-content-center align-items-center"style={{height:"90vh"}}>
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    
    
    }
    
    </>)
}

export default ProductDetails;