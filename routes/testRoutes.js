const express = require('express');
const { checking } = require('../controllers/testControllers');
const router = express.Router();

router.get("/test",checking);

module.exports = router;
