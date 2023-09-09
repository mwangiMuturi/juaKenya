const { CountiesModel } = require("../models/countiesModel");

//render home page
const home =async (req, res) =>{
        //find all counties
    const counties=await CountiesModel.find({}).lean()
  res.render("home", {
    title: "juaKenya",counties
  })
}

//POST create page
const create =async (req, res) => {
  const newCounty = {
    ...req.body,
  };
  if (!newCounty.name || !newCounty.index) {
    return res
      .status(400)
      .json({ msg: "Please include a name and county number" });
  }
  try {
   await CountiesModel.create(newCounty);
  } catch (error) {
    console.log(`Found ${error}`);
  }
  res.redirect("/create");
};

//find a single member
const findmember = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    let county = await CountiesModel.findOne({ _id: id }).lean();
    if (county) {
      // await UserModel.deleteOne({_id:id})
      res.render("editcounty", {county});
    } else {
      res.status(400).json(`county ${id} not found`);
    }
  } catch (error) {
    console.log(`Found ${error}`);
    res.status(400).json(`county ${id} not found`);
  }
};
//get addfact page
const getaddfact=(req,res)=>{
    const id=req.params.id
    res.render('addfact',{id})
}
//adding fun fact
const addfact=async(req,res)=>{
    const documentId=req.params.id
    const newFunfact = req.body.funfact; // Assuming you send the new funfact in the request body

    try {
      // Find the document by ID and push the new funfact to the 'funfacts' array
      const updatedDocument = await CountiesModel.findByIdAndUpdate(
        documentId,
        { $push: { funfact: newFunfact } },
        { new: true } // Return the updated document
      );
  
      if (!updatedDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      return res.redirect (`/counties/${documentId}`);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  
  
}

module.exports = {
  home,
  create,
  findmember,
  addfact,
  getaddfact
};
