const userModel = require("../models/userModels");

const getDonarsListController  =  async(req,res)=>{
    try{
        const donarData = await userModel
        .find({role:"donar"})

        .sort({createdAt: -1});

        return res.status(200)
        .send({
            success:true,
            TotalCount:donarData.length,
            message:"Donar List fetched",
            donarData
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error in Donar List Api",
            error
        })
    }
}
//GET HOSPITAL LIST
const getHospitalListController = async (req, res) => {
    try {
      const hospitalData = await userModel
        .find({ role: "hospital" })
        .sort({ createdAt: -1 });
  
      return res.status(200).send({
        success: true,
        Toatlcount: hospitalData.length,
        message: "HOSPITAL List Fetched Successfully",
        hospitalData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Hospital List API",
        error,
      });
    }
  };
  //GET ORG LIST
  const getOrgListController = async (req, res) => {
    try {
      const orgData = await userModel
        .find({ role: "organisation" })
        .sort({ createdAt: -1 });
  
      return res.status(200).send({
        success: true,
        Toatlcount: orgData.length,
        message: "ORG List Fetched Successfully",
        orgData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In ORG List API",
        error,
      });
    }
  };

  const deleteDonarController = async(req,res)=>{
    try{
        console.log("Ypu are almost here")
        
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:"Record Deleted Successfuly"
        })

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error while deleting",
            error
        })
    }
  }
  
module.exports = {getDonarsListController,
    getHospitalListController,
    getOrgListController,
    deleteDonarController

}