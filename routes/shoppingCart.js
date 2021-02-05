const express = require('express');
const router = express.Router();

//connect to the mongoDB database using MongoDB atlas
const monk = require('monk');
//const db = monk('localhost:27017/farm');
const db = monk('mongodb+srv://kevin:1234@cluster0.togxk.mongodb.net/vegefruit?retryWrites=true&w=majority');

db.then(() => {
    console.log("connection success");
}).catch((e) => {
    console.error("Error!", e);
});


//get the orders in the shopping cart
router.get('/',  function(req,res) {
	var collection = db.get('SHOPPING_CART');
	collection.find({}, function(err, shopping_cart) {
		if (err) throw err;
		res.json(shopping_cart);
	});
});

//add item to shopping cart
router.post('/add', function(req, res) {
    
    //check if email exists
    var collection = db.get('SHOPPING_CART');
    var collection1 = db.get('PRODUCTS');
    collection.insert({
        product_name: req.body.Name,
        weight: parseFloat(req.body.Weight,10),
        price: parseFloat(req.body.Price,10),

    }, function(err, item) {
        if (err) 
            throw err;
        else {
            //update inventory in products
            var oldWeight;
            // collection1.find({Name: req.body.Name}, function(err, item) {
            //     if (err) throw err;
            //     collection1.findOneAndUpdate({Name: req.body.Name}, { $set: {Stock_weight: item.Stock_weight-parseFloat(req.body.Weight,10)} }, {multi: false}, function(err, product) {
            //         if (err) throw err;
            //     });
            // });
            

            res.json({
                product_name: item.product_name,
                weight: item.weight,
                price: item.price             
            })             
        }                       
    });

});

//update the weight in shopping cart
router.put('/:id', function(req, res) {
    var collection = db.get('SHOPPING_CART');
    //***********************UPADATE TO ADD PRICE**************************************************************************************** */
	collection.findOneAndUpdate({_id: req.params.id}, { $set: {weight: parseFloat(req.body.weight,10)} }, {multi: false}, function(err, order) {
        if (err) throw err;
		collection.find({}, function(err, shopping_cart) {
            if (err) throw err;
            res.json(shopping_cart);
        });
    });

});

//delete a suborder in shopping cart
router.delete('/:id', function(req, res) {
	var collection = db.get('SHOPPING_CART');
	collection.remove({ _id: req.params.id}, function(err, orders) {
        if(err) throw err;
        collection.find({}, function(err, shopping_cart) {
            if (err) throw err;
            res.json(shopping_cart);
        });
	})	
	
});


module.exports = router;