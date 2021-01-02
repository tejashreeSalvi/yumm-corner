const { Router } = require('express');
const authController = require('../controllers/authOrderController');
const { route } = require('./authRoutes');
const router = Router();
// get request...

//post
router.post('/saveOrder', authController.postsaveOrder);
router.delete('/deleteOrder', authController.deleteData);

module.exports = router;