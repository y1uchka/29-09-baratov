import express from 'express'

const app = express()

const DB = {
  products: [],
  orders: [],
  users: [],
  newProID: 0,
  newOrdID: 0,
  newUseID: 0,
};

class Product {
  constructor(title, price){
    this.productId = ++DB.newProID;
    this.title = title;
    this.price = price;
  }
}

class User {
  constructor(name,email){
    this.userId = ++DB.newUseID;
    this.name = name;
    this.email = email;
  }
}

class Order {
  constructor(userId, productId, total){
    this.orderId = ++DB.newOrdID;
    this.userId = userId;
    this.productId = productId;
    this.total = total;
  }
}
// crud products
app.get('/products', (req,res)=>{
  res.json(DB.products);
});
app.get('/products/:id', (req,res)=>{
  const item = DB.products.find(p=>p.productId === Number(req.params.id));
  res.json(item);
})
app.post('/products', (req, res)=>{
  const item = new Product(req.body.title, req.body.price);
  DB.products.push(item);
  res.json(item)
});
app.put('/products/:id', (req,res) => {
  const item = DB.products.find(p=>p.productId === Number(req.params.id));
  item.title = req.body.title ?? item.title;
  item.price = req.body.price ?? item.price;
  res.json(item);
})
app.delete('/products/:id', (req,res)=> {
  DB.products = DB.products.filter(p=>p.productId !== Number(req.params.id));
  res.json({message: 'deleted'})
})

//crud users
app.get('/users', (req,res)=>{
  res.json(DB.users)
})
app.get('/users/:id', (req,res)=>{
  const user = DB.users.find(u=>u.userId === Number(req.params.id));
  res.json(user)
})
app.post('/users', (req,res)=>{
  const user = new User(req.body.name, req.body.email);
  DB.users.push(user);
  res.json(user)
});
app.put('/users/:id', (req,res)=>{
  const user = DB.users.find(u=>u.userId === Number(req.params.id));
  user.name = req.body.name ?? user.name
  user.email = req.body.email ?? user.email
  res.json(item);
})
app.delete('/users/:id', (req,res)=>{
  DB.users = DB.users.filter(u=>u.userId !== Number(req.params.id));
  res.json({message:'deleted'})
})

//crud orders
app.get('/orders', (req, res) => {
  res.json(DB.orders);
});
app.get('/orders/:id', (req, res) => {
  const order = DB.orders.find(o => o.orderId === Number(req.params.id));
  res.json(order);
});
app.post('/orders', (req, res) => {
  const order = new Order(req.body.userId, req.body.productId, req.body.total);
  DB.orders.push(order);
  res.json(order);
});
app.put('/orders/:id', (req, res) => {
  const order = DB.orders.find(o => o.orderId === Number(req.params.id));
  order.userId = req.body.userId ?? order.userId;
  order.productId = req.body.productId ?? order.productId;
  order.total = req.body.total ?? order.total;
  res.json(item);
});
app.delete('/orders/:id', (req, res) => {
  DB.orders = DB.orders.filter(o => o.orderId !== Number(req.params.id));
  res.json({message:'deleted'});
});

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
