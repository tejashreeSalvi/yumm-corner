const { Router } = require('express');
const authController = require('../controllers/authControllers');
const router = Router();
// get request...

router.get('/signup', authController.signup_get);
router.get("/login", authController.login_get);
router.get("/pay", authController.pay_get);
// post request...
router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);

router.get("/logout", authController.logout_get);

module.exports = router;