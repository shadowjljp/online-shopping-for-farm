const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders')

const shoppingCartRouter = require('./routes/shoppingCart');
const productsRouter = require('./routes/productsDS');
const PORT = 5000;


app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/shopping-cart', shoppingCartRouter);
app.use('/orders', ordersRouter)

//products
app.use('/products', productsRouter);



app.listen(PORT, function() {
    console.log("Server started on port: " + PORT);
});
    


