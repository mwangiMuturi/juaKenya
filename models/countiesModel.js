const mongoose =require ("mongoose")

const CountiesSchema=new mongoose.Schema({
name:{type:String,required:true},
index:{type:Number,required:true,unique:true},
population:{type:Number,required:true},
map:String ,
size:{type:Number,required:true},
funfact:[String],
image:String
})
const CountiesModel=mongoose.model("counties",CountiesSchema)

module.exports={CountiesModel}