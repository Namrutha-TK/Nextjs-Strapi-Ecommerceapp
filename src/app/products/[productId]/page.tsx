'use client'

import React, { useContext } from "react";
import { useState,useEffect } from "react";
import { ProductService } from "@/app/services/Products_Service";
//import AddToCart from "@/app/components/AddToCart/AddToCart";
import { useRouter } from "next/navigation";
import { CartContext } from "@/app/context/CartContext";
import {CartItem} from "@/app/context/CartContext"

interface Product {
  id: string;
  documentId:string,
  title: string;
  description: string;
  category_name:string;
  price:number;
  image: string ;
}
export default  function ProdutDetail(props:any){
    
  const router=useRouter();
    console.log (props);
    const productId=props.params.productId;
    const [product, setProduct] = useState<Product | null>(null);
    const cartContext = useContext(CartContext);

    if (!cartContext) {
      return <div>Error: Cart context is not available</div>;
    }
  
    const { addToCart } = cartContext;
    useEffect(() => {
      const fetchProductDetails = async () => {
          if (productId) {
              try {
                  const fetchedProduct = await ProductService.getProductById(productId as string);
                  console.log('product detail', fetchedProduct);
                  setProduct(fetchedProduct);
              } catch (error) {
                  console.error('Failed to fetch product:', error);
              }
          }
      };
      fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
}

const handleAddToCart = () => {
  if (product) {
    const cartItem: CartItem = {
      documentId:product.documentId,
      id: product.id,  
      title: product.title,
      price: product.price,
      description: product.description,
      category_name:product.category_name,  
      image: product.image,
      quantity: 1,
    };
    addToCart(cartItem);
  }
};

    return(
      <div className="container-fluid mb-4 gap-2 pt-5">
        
      <div className="productDetails d-flex">
       <div className="col-md-4">
       
         <img 
           src={product.image}
         height={400} alt={product.title}/>
     
       </div>
       <div className="col-md-5">
         <a href="#" className="text-dark text-decoration-none">Visit the&nbsp;
           {product.title } store
            </a>
            <h5>{product.title}</h5>
            <p>100 + bought in past month </p>
          <hr/>
          <p><span className="price_symbol">₹</span><span className="product_Price">
           { product.price} 
           </span> M.R.P.</p>
          <hr/>
          <h6>Product Details</h6>
         <p>{product.description}</p>
         
       </div>
       <div className="col-md-3 subData border border-1 rounded-2">
       <p><span className="price_symbol">₹</span><span className="product_Price">
         {product.price} 
         </span></p>
        <p><a href="#">Free delivery </a>sunday, 7 july</p> 
        <p>Order within <span className="text-success">12 hrs 2 mins</span></p>
        <a href="#">Details</a>
        <p><i className="bi bi-geo-alt"></i>Delivering to Mumbai 4000001-<br/>Update location</p>
        <p className="text-danger">Only few left in stock</p>
        <p><span >ships from</span>&nbsp;Amazon</p>
        <p><span >sold by</span>&nbsp;<span className="text-prime">Cocoblu Retail</span></p>
        <div className="d-grid gap-2">
        <button type="button" className="btn btn-warning rounded-pill" 
         onClick={handleAddToCart }
        >Add To Cart</button>
       <button type="button" className="btn btn-success rounded-pill buynowBtn">Buy Now</button>
       </div>
        <p><i className="bi bi-lock"></i><span>Secure transaction</span></p>
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Add gift options
                </label>
         </div>
         <hr/>
         <input className="form-control form-control-sm" type="text" placeholder="Add to Wish List" aria-label=".form-control-sm example"></input>

       </div>
     </div> 

     </div>
           



    )
}