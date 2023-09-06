const express =  require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { checking } = require('../controllers/testControllers');
const { createInventoryController, getInventoryController, getDonorController, getHospitalController, getOrgnaisationController, getOrgnaisationForHospitalController, getInventoryHospitalController, getRecentInventoryController } = require('../controllers/inventoryContoller');

const router = express.Router();
// ADD inventory
router.post('/create-inventory',authMiddleware,createInventoryController);

//get all blood record
router.get('/get-inventory',authMiddleware,getInventoryController);

//get hospital blood record
router.post('/get-inventory-hospital',authMiddleware,getInventoryHospitalController);
//GET RECENT BLOOD RECORDS

router.get(
    "/get-recent-inventory",
    authMiddleware,
    getRecentInventoryController
  );


//donor
router.get('/get-donars',authMiddleware,getDonorController);

//hospital
router.get('/get-hospitals',authMiddleware,getHospitalController);


//organisation
router.get('/get-organisation',authMiddleware,getOrgnaisationController)


//organisation-for-hospital
router.get("/get-organisation-for-hospital",authMiddleware,getOrgnaisationForHospitalController);


router.get("/test",checking);
module.exports = router;