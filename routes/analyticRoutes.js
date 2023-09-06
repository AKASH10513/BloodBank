const express =  require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { bloodGroupDetailsContoller } = require('../controllers/analyticsController');

const router = express.Router();
//GET BLOOD DATA
router.get("/bloodGroups-Data",authMiddleware,bloodGroupDetailsContoller);

module.exports = router;