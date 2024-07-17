const mongoose=require("mongoose");
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    podcasts:[{
        type:mongoose.Schema.Types.ObjectId,ref:'Podcast'
    }]
})


module.exports=mongoose.model('Category',categorySchema);