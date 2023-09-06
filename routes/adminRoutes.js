const express  = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleaware = require('../middleware/adminMiddleaware');
const { getDonarsListController, getOrgListController, getHospitalListController, deleteDonarController } = require('../controllers/adminController');
const router  = express.Router();

//GET || DONAR LIST
router.get("/donar-list",authMiddleware,adminMiddleaware,getDonarsListController)

//GET || HOSPITAL LIST
router.get(
    "/hospital-list",authMiddleware,adminMiddleaware,
    getHospitalListController
  );
  //GET || ORG LIST
  router.get("/org-list", authMiddleware, adminMiddleaware, getOrgListController);

// DELETE DONAR || GET

  router.delete('/delete-donar/:id',authMiddleware,adminMiddleaware,deleteDonarController)
module.exports = router;