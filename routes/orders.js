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





//get the orders for the user
router.get('/:id',  function(req,res) {
	var collection = db.get('ORDER');
	collection.find({user_id: req.params.id}, function(err, orders) {
		if (err) throw err;
		res.json(orders);
	});
});

//add order
router.post('/add', function(req, res) {
    

    var collection = db.get('ORDER');
    var collection1 = db.get('SHOPPING_CART');
    collection.insert({
		user_id: req.body.user_id,
		total: req.body.total

    }, function(err, item) {
        if (err) 
            throw err;
        else {
			//delete entries in shopping cart
			collection1.remove({ }, function(err, orders) {
				if(err) throw err;
				collection.find({}, function(err, shopping_cart) {
					if (err) throw err;
				});
			})
            res.json({
				id: item._id,
				user_id: item.user_id,
				total: item.total           
            })             
        }                       
    });

});


module.exports = router;