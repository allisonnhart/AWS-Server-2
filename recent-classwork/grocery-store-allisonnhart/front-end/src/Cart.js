import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Cart() {
  // setup state
  // const [cart, setCart] = useState([]);
  // const [error, setError] = useState("");
  // const [name, setName] = useState("");

  // const fetchCart = async () => {
  //   try {
  //     const response = await axios.get("/api/cart");
  //     setCart(response.data);
  //   }
  //   catch (error) {
  //     setError("error retrieving cart: " + error);
  //   }
  // }
  // const createCart = async () => {
  //   try {
  //     await axios.post("/api/cart", { name: name });
  //   }
  //   catch (error) {
  //     setError("error creating a cart: " + error);
  //   }
  // }
  // const deleteACart = async (cart) => {
  //   try {
  //     await axios.delete("/api/cart/" + cart.id);
  //   }
  //   catch (error) {
  //     setError("error deleting a cart" + error);
  //   }
  // }

  // // fetch ticket data
  // useEffect(() => {
  //   fetchCart();
  // }, []);

  // const addCart = async (e) => {
  //   e.preventDefault();
  //   await createCart();
  //   fetchCart();
  //   setName("");
  // }

  // const deleteCart = async (cart) => {
  //   await deleteACart(cart);
  //   fetchCart();
  // }

  // render results
  return (
    <p>Hello World</p>
    // <div>
    
    //   <h1>Cart</h1>
    //       {cart.map( element => (<div>
          
          
    //     <p>{element.id}<button type="button">Add To Cart</button></p>
        
        
    //     </div>
    //     // <button type="button">Add To Cart</button>
    //     )
    //   )
    // }
      
    
    // </div>
    // <div className="Cart">
    //   {error}
    //   <h1>Create a Cart</h1>
    //   <form onSubmit={addCart}>
    //     <div>
    //       <label>
    //         Name:
    //         <input type="text" value={name} onChange={e => setName(e.target.value)} />
    //       </label>
    //     </div>
    //     <input type="submit" value="Submit" />
    //   </form>
    //   <h1>Cart</h1>
    //   {cart.map( cart => (
    //     <div key={cart.id} className="cart">
    //       <div className="name">
    //         <p><i>-- {cart.name}</i></p>
    //       </div>
    //       <button onClick={e => deleteACart(cart)}>Delete</button>
    //       <button onClick={e => addCart(cart)}>Add</button>
    //     </div>
    //   ))}     
    // </div>
  );
}

export default Cart;
