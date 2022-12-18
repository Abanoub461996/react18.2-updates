import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux"
import {selectProductAction, addToWishlist, removeFromWishList} from "../../../utils/redux"
// icons
import { MdAddShoppingCart, MdShoppingCart } from "react-icons/md";

import "./ProductCard.css";

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
        <div className="col">
        <div className="card h-100 m-1 item-card" onClick ={goToDetails}>
            <img src={product.images.length ? product.images[0]: "https://api.lorem.space/image/watch?w=640&h=480&r=5623"} loading="lazy" className="card-img-top mx-auto p-3" alt="product" style={{maxHeight: "400px", width:"fit-content", maxWidth:"100%"}}/>
            <div className="card-body">
                <div className="card-header">
                    <h5 className="card-title">{product.title}</h5>
                    <h6 className="card-text">{product.category.name}</h6>
                </div>
            

            <p className="card-text">{product.description.length >80 ? product.description.slice(0,80)+"...":
             product.description} 
             <small className="show-more text-muted ms-1" style={{whiteSpace:"nowrap"}} onClick ={goToDetails}>show more.</small></p>
            <div className="card_subFlex">
            <p className="card-text card-price">{parseInt(product.price.toString())} EGP</p>
            {fav?
            <MdShoppingCart style={{fontSize: '30px',color: '#084298', cursor:"pointer"}} onClick={toggleFav}/>
            :
            <MdAddShoppingCart style={{fontSize: '30px',color: '#d15834', cursor:"pointer"}} onClick={toggleFav}/>
            }
            </div>
            

            </div>
        </div>
        </div>
        </>
    )
} 
export default ProductCard;