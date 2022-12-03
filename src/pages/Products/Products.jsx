import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Pagination , usePagination} from "@mui/material";
// Components

import ProductCard from "./ProductCard/ProductCard"
const Products =()=>{
    const [products, setProducts] = useState([])
    let user = useSelector((state)=>{
        return state.user
    })

    useEffect(()=>{
        fetch('https://api.escuelajs.co/api/v1/products')
        .then(res=>res.json())
        .then(json=>setProducts(json))
    })
   const [currentPage, setCurrentPage] = useState(1);
   const [prodsPerPage] = useState(15);
 
   // ...
 
   const indexOfLastPost = currentPage * prodsPerPage;
   const indexOfFirstPost = indexOfLastPost - prodsPerPage;
   const totalProds =products.length;
   const currentProds = products.slice(indexOfFirstPost, indexOfLastPost);
   const _DATA = usePagination(products, prodsPerPage);

  const handleChange = (e, p) => {
    setCurrentPage(p);
    _DATA.jump(p);
  };
   const previousPage = () => {
    if (currentPage !== 1) {
       setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== Math.ceil(totalProds.length / prodsPerPage)) {
        setCurrentPage(currentPage + 1);
        }
    };
    return(<>
        {(user?.loginToken) && <div className="alert alert-success text-center">
            Hi {user?.userProfile.email.slice(0,4)}! let's start shopping our best seeling items
        </div>}
        {products.length ? 
        <><div className="row row-cols-1 row-cols-md-3 g-4 mx-4">
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