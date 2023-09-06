const mongoose = require('mongoose');
const inventoryModel =  require('../models/inventoryModel');

const userModel = require('../models/userModels');
const { response } = require('express');



//CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    //save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Reocrd Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Errro In Create Inventory API",
      error,
    });
  }
};

const getInventoryController=async(req,res) =>{
    try{

        const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get all records successfully",
      inventory,
    });
  

    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error In Get All Inventory",
            error
        })
    }
}
// GET Hospital BLOOD RECORS
const getInventoryHospitalController = async (req, res) => {
  try {
    console.log("orintinrg");
    console.log(req.body.filters);
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get hospital comsumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get consumer Inventory",
      error,
    });
  }
};
//get Recent blood of 3
const getRecentInventoryController = async(req,res)=>{
  
  try{
      const inventory = await inventoryModel
      .find({
        organisation:req.body.userId,
      })
      .limit(3)
      .sort({createdAt:-1});
      console.log("priting",inventory);
      return res.status(200).send({
        success:true,
        message:"recenl updates",
        inventory,
        error

      });
  }catch(error)
  {
    return res.status(500).send({
      success:false,
      message:"Error in Recent Inventory API",
      error,
    })
  }
}

//GET DONORS
const getDonorController = async(req,res)=>{
  
  try{
    const organisation =  req.body.userId;
    //find donors
    
    
    const donorId =  await inventoryModel.distinct("donar",{
      organisation,
    })
    const donars =  await userModel.find({_id:{$in:donorId}});
    return res.status(200).send({
      success:true,
      message:"Donar records fetched succesfully",
      donars
    })
    

  }
  catch(error)
  {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get donor API",
      error,
    });
  }
}

//GET Hospitals 
const getHospitalController = async(req,res)=>{
  try{
    const organisation = req.body.userId;
    const hospitalId = await inventoryModel.distinct("hospital",{
      organisation,

    })
    const hospitals = await userModel.find({
      _id:{
        $in:hospitalId
      },
    })
    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });

  }
  catch(error)
  {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get Hospital  API",
      error,
    });
  }
  

}
const getOrgnaisationController = async(req,res)=>{

try{
const donar  = req.body.userId;
const orgId =   await inventoryModel.distinct("organisation",{donar});
const organisations = await userModel.find({
  _id:{$in:orgId}
})
return res.status(200).send({
  success:true,
  message:"organisation fetched successfully",
  organisations
})
}
catch(error)
{
  console.log(error);
  return res.status(500).send({
    success:false,
    message:"error in org api",
    error
  })
}
}


// GET ORG for Hospital

const getOrgnaisationForHospitalController = async (req, res) => {
  try {
    
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { hospital });
    
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    console.log(organisations);
    return res.status(200).send({
      success: true,
      message: "Hospital Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital ORG API",
      error,
    });
  }
};

module.exports = {createInventoryController,
  getInventoryController,
  getDonorController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController
  };