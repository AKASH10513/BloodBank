const express = require('express');
const { checking } = require('../controllers/testControllers');
const {registerController, loginController, currentUserController} =require('../controllers/authContoller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/register',registerController);
router.post('/login',loginController);
router.get('/current-user',authMiddleware,currentUserController);
module.exports = router;
