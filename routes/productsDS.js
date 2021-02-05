const express = require('express');
const router = express.Router();
const mogodb = require('mongodb');
//connect to the mongoDB database
const monk = require('monk');
const db = monk('mongodb+srv://kevin:1234@cluster0.togxk.mongodb.net/vegefruit?retryWrites=true&w=majority');

db.then(() => {
    console.log("mongodb connection success");
}).catch((e) => {
    console.error("Error!", e);
});




//get the products 
router.get('/', function(req,res) {
	var collection = db.get('PRODUCTS');
	collection.find({}, function(err, products) {
		if (err) throw err;
        res.json(products);
	});   
});



//get the products 
router.get('/:id', function(req,res) {
	var id= req.params.id;
	console.log(id);
	db.collection('PRODUCTS').findOne({_id : id}, function(err, products) {
		if (err) console.log(err);
        res.json(products);
	});   
});

//update
router.put('/edit/:id', function(req, res){
	console.log("product update with id "+req.body._id)
	var collection = db.get('PRODUCTS');
	collection.findOneAndUpdate({ _id: req.body._id  }, 
		{$set:
			{	Name: req.body.Name,
				Price: parseFloat(req.body.Price,10),
				Stock_weight: parseFloat(req.body.Stock_weight,10),
				Type: req.body.Type,
				Image_id: req.body.Image_id,
				Description: req.body.Description,
				Show: Boolean(req.body.Show)
			}

	},function(err, video){
    	if (err) throw err;
 
    	res.send('update');
	});
});

//delete
router.put('/delete', function(req, res){
	var collection = db.get('PRODUCTS');
	collection.findOneAndUpdate({ _id: req.body._id  }, 
		{$set:
			{	
				Show: Boolean(0)
			}

	},function(err, video){
    	if (err) throw err;
 
    	res.send('delete');
	});
});

router.put('/:id/edit', function(req, res){
	var collection = db.get('PRODUCTS');
	collection.findOneAndUpdate({ _id: req.body._id }, 
		{$set:
			{	Name: req.body.Name,
				Price: parseFloat(req.body.Price,10),
				Stock_weight: parseFloat(req.body.Stock_weight,10),
				Type: req.body.Type,
				Image_id: req.body.Image_id,
				Description: req.body.Description,
				Show: Boolean(req.body.Show)
			}

	},function(err, video){
    	if (err) throw err;
 
    	res.send('update');
	});
});

module.exports = router;
router.post('/create', function(req,res){
    var collection = db.get('PRODUCTS');
    collection.findOne({ Name: req.body.Name }, function(err, product) {
        if(err) {
            res.send({ success:false, message: "Server error"});
        }
        else {
            if(product) {
                res.status(400).json({ error: "Product already exists"});
            }
            else {
				//email doesn't exist, okay to add
				
                collection.insert({
                    Name: req.body.Name,
					Price: parseFloat(req.body.Price,10),
					Stock_weight: parseFloat(req.body.Stock_weight,10),
					Type: req.body.Type,
					Image_id: req.body.Image_id,
					Description: req.body.Description,
					Show: Boolean(req.body.Show)
                }, function(err, product) {
                    if (err) 
                        throw err;
                    else {
                        res.json({
                            id: product._id,
                            Name: product.Name
                        }) 
                        
                    }
                        
                });

                }
            }
    });

});

module.exports = router;
