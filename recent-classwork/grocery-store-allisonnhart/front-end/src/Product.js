import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CartItem from './CartItem.js';

function Product() {
  // setup state
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cart, setCart] = useState([]);

  const fetchProducts = async() => {
    try {      
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch(error) {
      setError("error retrieving products: " + error);
    }
  };
  
   const fetchProduct = async(id) => {
     console.log('in fetch product');
    try {      
      const response = await axios.get("/api/products/"+id);
      console.log(response);
      return response.data.name;
    } catch(error) {
      setError("error retrieving products: " + error);
    }
  };
  
  const addToCart = async(product) => {
    console.log('in function');
    try {      
      const response = await axios.post("/api/cart/"+product.id+"/"+product.name);
      console.log(response);
      //setProducts(response.data);
    
      setCart(response);
    } catch(error) {
      setError("error retrieving products: " + error);
    }
  };
  
  const createProduct = async() => {
    try {
      await axios.post("/api/products", {name: name, price: price});
    } catch(error) {
      setError("error adding a product: " + error);
    }
  };
  
  const deleteOneProduct = async(product) => {
    try {
      await axios.delete("/api/products/" + product.id);
    } catch(error) {
      setError("error deleting a product" + error);
    }
  };

  // fetch ticket data
  useEffect(() => {
    fetchProducts();
  },[]);

  const addProduct = async(e) => {
    e.preventDefault();
    await createProduct();
    fetchProducts();
    setName("");
    setPrice("");
  };

  const deleteProduct = async(product) => {
    await deleteOneProduct(product);
    fetchProducts();
  };

  // const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await axios.get("/api/cart");
      setCart(response.data);
      console.log(response.data);
    }
    catch (error) {
      setError("error retrieving cart: " + error);
    }
  };
  
  const createCart = async () => {
    try {
      await axios.post("/api/cart", { name: name });
    }
    catch (error) {
      setError("error creating a cart: " + error);
    }
  };
  
  const deleteACart = async (cart) => {
    try {
      await axios.delete("/api/cart/" + cart.id);
    }
    catch (error) {
      setError("error deleting a cart" + error);
    }
  };

  // fetch ticket data

  // const addCart = async (e) => {
  //   e.preventDefault();
  //   await createCart();
  //   fetchCart();
  //   setName("");
  // };

  const deleteCart = async (cart) => {
    await deleteACart(cart);
    fetchCart();
  };
  
  const deleteCartItem = async (id) => {
    try {
      await axios.delete("/api/cart/" + id);
      fetchCart();
    }
    catch (error) {
      setError("error deleting a cart" + error);
    }
  };
  
  useEffect(() => {
    fetchCart();
  }, []);
  // render results
  return (
    <div>
    
    <div>
    
      <h1>Cart</h1>
          {cart.map( itemInCart => (<div>
          
        <CartItem item={itemInCart}/>
        
        <button type="button"onClick={e=>deleteCartItem(itemInCart.id)}>Remove From Cart</button>
        
        </div>
        // <button type="button">Add To Cart</button>
        )
      )
    }
    
    
      
    
    </div>
    
    
    
       <h1>Products</h1>
    {products.map( product => (
        <p>{product.name} , {product.price} <button type="button" onClick={e=>addToCart(product)}>Add To Cart</button></p>
        // <button type="button">Add To Cart</button>
        )
      )
    }
    
    
    
    </div>
    
    // <div className="Product">
    //   {error}
    //   <h1>Create a Product</h1>
    //   <form onSubmit={addProduct}>
    //     <div>
    //       <label>
    //         Name:
    //         <input type="text" value={name} onChange={e => setName(e.target.value)} />
    //       </label>
    //     </div>
    //     <div>
    //       <label>
    //         Price:
    //         <textarea value={price} onChange={e=>setPrice(e.target.value)}></textarea>
    //       </label>
    //     </div>
    //     <input type="submit" value="Submit" />
    //   </form>
    //   <h1>Products</h1>
    //   {products.map( product => (
    //     <div key={product.id} className="product">
    //       <div className="price">
    //         <p>{product.price}</p>
    //         <p><i>-- {product.name}</i></p>
    //       </div>
    //       <button onClick={e => deleteProduct(product)}>Delete</button>
    //     </div>
    //   ))}     
    // </div>
  );
}

export default Product;

