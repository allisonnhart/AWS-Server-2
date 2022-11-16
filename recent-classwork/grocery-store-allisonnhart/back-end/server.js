const express = require('express');
const bodyParser = require("body-parser");
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

let products = [];
let id = 0;

app.get('/api/products/', (req, res) => {
  console.log("In get");
  res.send(products);
});


app.get('/api/products/:id', (req, res) => {
  
  let id = parseInt(req.params.id);
  const product = products.find(product=>product.id === id);  
  if(!product) {
    res.status(404)
      .send("Sorry, that product doesn't exist");
    return;  
  }
  console.log('inget');
  console.log(product);
  res.send(product);
  
});
//still need get api products by id


app.post('/api/products', (req, res) => {
  console.log("In post");
  console.log(req.body);
  const id = crypto.randomUUID();
  let product = {
    id: id,
    name: req.body.name,
    price: req.body.price
  };
  products.push(product);
  res.send(product);
});

app.delete('/api/products/:id', (req, res) => {
  console.log("In delete");
  let id = parseInt(req.params.id);
  let removeIndex = products.map(product => {
      return product.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that product doesn't exist");
    return;
  }
  products.splice(removeIndex, 1);
  res.sendStatus(200);
});




let cart = [];
let cartItem = [];

app.post('/api/cart/', (req, res) => {
  console.log("In post");
  console.log(req.body);
  const id = crypto.randomUUID();
  let itemInCart = {
    id: id,
    name: req.body.name,
    quantity: req.body.quantity
  };
  cart.push(itemInCart);
  res.send(itemInCart);
});
//each item in a json object, where u have an item and a quantity

app.get('/api/cart/', (req, res) => {
  console.log("In get");
  res.send(cart);
});

app.post('/api/cart/:id/:name', (req, res) => {
  let id = (req.params.id);
  console.log("Adding to cart" + id);
  let item = {
    id: id,
    name: req.params.name,
    quantity: 1,
  };
  let foundItem = cart.find(item => item.id == id);
  if(foundItem) {
    // let checkIndex = cart.indexOf(foundItem);
    // cart[checkIndex].quantity += 1;
    // item.quantity = cart[checkIndex].quantity;
      // item++;
      foundItem +=1;
      item.quantity = foundItem.quantity;
  } else {
      cart.push(item);  
  }
  console.log(item)
  res.send(item);
});

app.put('/api/cart/:id/:quantity', (req, res) => {
  const id = req.params.id;
  const quantity = parseInt(req.params.quantity);
  
  const foundItem = cart.find(item => item.id == id);
  
  if(!foundItem) {
    res.sendStatus(404);
    return;
  }
  
  console.log(cart);
  
  foundItem.quantity = quantity;
  if (foundItem.quantity <= 0) {
    cart = cart.filter((item) => item.id != id);
  }
  console.log(cart);
  res.send(foundItem);
});

app.delete('/api/cart/:id', (req, res) => {
  console.log("In delete");
  let id = req.params.id;
  let removeIndex = products.map(product => {
      return product.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that product doesn't exist");
    return;
  }
  cart.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));