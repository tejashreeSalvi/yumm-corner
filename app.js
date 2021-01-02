const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const authOrderRoutes = require('./routes/authOrderRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const app = express();

const path = require('path');
app.use(express.static(__dirname + '/dist/server'));
// middleware..
app.get('/*', function(req,res) {
    res.sendFile(
        path.join(__dirname + '/dist/server/home')
    );
});

app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = "mongodb+srv://abc-app:abc-app@mongodbcluster.o6zje.mongodb.net/node-auth";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => {
        app.listen(process.env.PORT || 8080);
        console.log("Mongo Atlas connected");
    })
    .catch((err) => console.log(err));

// routes 
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth ,(req, res) => res.render('smoothies'));

app.use(authRoutes);
app.use('/order',authOrderRoutes);




// //cookies
// app.get('/set-cookies', (req, res) => {
//     res.setHeader('Set-Cookie', 'newUser = true'); 
    
//     res.cookie('newUser', false);
//     res.send("You get the cookie");
// });

// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies;
//     console.log(cookies);
//     res.json(cookies);
// });
