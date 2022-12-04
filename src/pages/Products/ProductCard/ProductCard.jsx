import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux"
import {selectProductAction, addToWishlist, removeFromWishList} from "../../../utils/redux"
// icons
import { MdOutlineFavorite , MdOutlineFavoriteBorder} from "react-icons/md";
import "./ProductCard.css"
const ProductCard =({product})=>{
    const navigate = useNavigate();
    const [fav, setFav] = useState(false)
    const dispatch = useDispatch()

    function goToDetails(){
        dispatch(selectProductAction(product))
        navigate(`/product/${product.id}`)
    }
    function toggleFav(){
        if(!fav){
            dispatch(addToWishlist(product))
        }else{
            dispatch(removeFromWishList(product))
        }
        setFav(!fav)
    }
    return (
        <>
        <div className="col-3">
        <div className="card h-100 m-1 item-card">
            <img src={product.images[0]} loading="lazy" className="card-img-top mx-auto p-3" alt="product" style={{maxHeight: "400px", width:"fit-content", maxWidth:"100%"}}/>
            <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            {/* <h6 className="card-text">{product.category}</h6> */}

            {/* <p className="card-text">{product.description.length >80 ? product.description.slice(0,80)+"...":
             product.description}  */}
             {/* <small className="show-more text-muted ms-1" style={{whiteSpace:"nowrap"}} onClick ={goToDetails}>show more.</small></p> */}
            <div className="card_subFlex">
            <p className="card-text card-price">{(product.price.toString()).replace(".",",")} EGP</p>
            {fav?
            <MdOutlineFavorite style={{fontSize: '30px',color: 'red', cursor:"pointer"}} onClick={toggleFav}/>
            :
            <MdOutlineFavoriteBorder style={{fontSize: '30px',color: '#d15834', cursor:"pointer"}} onClick={toggleFav}/>
            }
            {/* <div className="d-flex align-items-baseline">
            <span className="stars alignright"><span style={{width:`${product.rating.rate*20}%`}}></span></span>
            <p className="card-text ms-2"><small className="text-muted">rated by: {product.rating.count} user</small></p>  
            </div> */}
            
            </div>
            

            </div>
        </div>
        </div>
        </>
    )
} 
export default ProductCard;