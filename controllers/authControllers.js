const User = require("../models/User");
const jwt = require('jsonwebtoken');

const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };

    // login error handling 
    if (err.message === 'incorrect email') {
        errors.email = 'The email is not registered';
    }

    if (err.message === 'incorrect password') {
        errors.password = 'The password is incorrect';
    }

    // if email is not unique i.e. duplicate error code
    if (err.code === 11000) {
        errors.email = "The email is already registered";
        return errors;
    }
    // if email and password is invalid i.e validation error
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'bheja is very intelligent', {
        expiresIn: maxAge
    });
};

module.exports.signup_get = (req, res) => {
    res.render("signup");
};

module.exports.login_get = (req, res) => {
    res.render("login");
};

module.exports.pay_get = (req, res) => {
    res.render("pay", {price: res.cookie.price});
}
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        console.log(user);
        // creating token
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({
            user: user._id,
            email: user.email
        });
        
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors});
    }
};

module.exports.logout_get = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
};


