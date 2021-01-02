const Order = require('../models/Order');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
module.exports.postsaveOrder = async(req, res) => {
    try {
    const newOrder = new Order({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        orderList: req.body.orderList,
        price: req.body.price,
    });

    console.log(newOrder);

    const alOrder = await Order.find({ email: req.body.email });
    res.setHeader('Set-Cookie', 'newUser = true'); 
    res.cookie('price', newOrder.price);
    res.send("You get the cookie");
        
    console.log(alOrder.length);
    if (alOrder.length >= 1) {
        console.log("Already Ordered!!!");
        const updateOrder = await Order.updateOne({ email: req.body.email }, { $set: { orderList: req.body.orderList, price: req.body.price } });  
        console.log("Order Update");
        return res.json({
            message: "Updated!!!",
            user: updateOrder
        });
    } else {
        console.log("New User!!!");
        //save;
        const orderSaved = await newOrder.save();

        return res.json(
            {
                message: "Order Saved!!",
                user: orderSaved
            }
        )
    }   
    } catch (err) {
        console.log("Error", err);
    }
};

module.exports.deleteData = async (req, res) => {
  
    try {
        const removedOrder = await Order.remove({
            email: req.body.email,
        });
        console.log("Deleted", removedOrder);
        app.get('/', (req, res) => res.render('home')); 
    } catch (err) {
        res.json({
            error: err,
            message: 'Not Deleted'
        })
    }
};
