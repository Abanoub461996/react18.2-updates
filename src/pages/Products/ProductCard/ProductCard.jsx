import { useNavigate } from "react-router-dom";
import { useState } from "react";
// icons
import { MdOutlineFavorite , MdOutlineFavoriteBorder} from "react-icons/md";
import "./ProductCard.css"
const ProductCard =({product})=>{
    const navigate = useNavigate();
    const [fav, setFav] = useState(false)
    function goToDetails(){
        navigate(`/product/${product.id}`)
    }
    function toggleFav(){
        setFav(!fav)
    }
    return (
        <>
        <div className="col-3">
        <div className="card h-100 m-1">
            <img src={product.image} className="card-img-top mx-auto p-3" alt="product" style={{maxHeight: "400px", width:"fit-content", maxWidth:"100%"}}/>
            <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <h6 className="card-text">{product.category}</h6>

            <p className="card-text">{product.description.length >80 ? product.description.slice(0,80)+"...":
             product.description} 
             <small className="show-more text-muted ms-1" style={{whiteSpace:"nowrap"}} onClick ={goToDetails}>show more.</small></p>
            <div className="card_subFlex">
            <p className="card-text text-info">{(product.price.toString()).replace(".",",")} EGP</p>
            <div className="d-flex align-items-baseline">
            <span class="stars alignright"><span style={{width:`${product.rating.rate*20}%`}}></span></span>
            <p className="card-text ms-2"><small className="text-muted">rated by: {product.rating.count} user</small></p>  
            </div>
            
            </div>
            {fav?
            <MdOutlineFavorite style={{fontSize: '30px',color: 'red', cursor:"pointer"}} onClick={toggleFav}/>
            :
            <MdOutlineFavoriteBorder style={{fontSize: '30px',color: 'wheat', cursor:"pointer"}} onClick={toggleFav}/>
            }

            </div>
        </div>
        </div>
        </>
    )
} 
export default ProductCard;