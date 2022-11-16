import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product.js';
import Cart from './Cart.js';

function CartItem(props) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");
    const fetchProduct = async(id) => {
     console.log('in fetch product');
    try {      
      const response = await axios.get("/api/products/"+id);
      console.log(response);
      setName(response.data);
      console.log('name: ' + name);
    } catch(error) {
      //setError("error retrieving products: " + error);
    }
    
};

const editCart = async(id, quantity) => {
    try {
      await axios.post("/api/cart/" + id + "/" + quantity);
      setQuantity(quantity);
    } catch(error) {
      setError("error editing cart: " + error);
    }
  };
  
  const deleteCartItem = async (id) => {
    try {
      await axios.delete("/api/cart/" + id);
    }
    catch (error) {
      setError("error deleting a cart" + error);
    }
  };

return(<div>
        <p>{props.item.name}, {quantity}
        <button type="button" onClick={e=>editCart(props.item.id, quantity - 1)}>-</button>
        <button type="button"onClick={e=>editCart(props.item.id, quantity + 1)}>+</button>
        </p>
    </div>
    );
  }
    
export default CartItem;







// <p>{product.name} , {product.price} <button type="button" onClick={e=>addToCart(product)}>Add To Cart</button></p>