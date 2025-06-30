import React,{useContext} from 'react';
import "./CSS/ShopCategory.css";
import {ShopContext} from '../Context/ShopContext';
import dropdown from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item'

export default function ShopCategory(props) {
  
  const {all_product} = useContext(ShopContext);

  return (
    <div className="shop-category">

      <img src={props.banner} className='shopcategory-banner' alt="" />

      <div className='shopcategory-indexShort'>
        <p>
          <span>Showing 1-12 </span>
          out of 36 products
        </p>

        <div className='shopcategory-short'>
          Sort by <img src={dropdown} alt="" />
        </div>
      </div>

      <div className='shopcategory-products' >
        {
        all_product.map((item,i)=>{
          if(props.category===item.category)
          {
            return <Item key={i} id={item.id} name={item.name} image = {item.image} new_price={item.new_price} old_price={item.old_price}></Item>
          }
          else{
            return null;

          }
        })}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    
    </div>
  )
}
