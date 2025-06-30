import React, { useContext } from 'react'
import "./ProductDisplay.css"
import star from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import {ShopContext} from "../../Context/ShopContext"

export default function ProductDisplay(props) 
{
    
    const {product} = props;
    const {addToCart} = useContext(ShopContext)
  return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img src={product.image} className="productdisplay-main-img" alt="" />

                </div>
            </div>

            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star} alt="" />
                    <img src={star} alt="" />
                    <img src={star} alt="" />
                    <img src={star} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>

                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-prices-old">
                        ${product.old_price}
                    </div>
                    <div className="productdisplay-right-prices-new">
                        ${product.new_price}
                    </div>
                </div>
                
                <div className="productdisplay-right-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim porro optio libero aliquam dolorum. Doloremque nesciunt nisi ipsam nemo voluptatibus, ex fugiat quod alias tempore.
                </div>
                
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>Small</div>
                        <div>Medium</div>
                        <div>Large</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                    
                    <button onClick={()=>{addToCart(product.id)}} >ADD TO CART</button>

                </div>
                    <p className='productdisplay-right-category'>
                        <span>Category : </span>
                        Women, T-Shirt, Crop top
                    </p>
                    
                    <p className='productdisplay-right-category'>
                        <span>Tags : </span>
                        Mordern Latest
                    </p>
                    

                

                

            </div>
        </div>
  )
}
