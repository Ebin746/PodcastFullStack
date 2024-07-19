const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    UserName:{type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    imageUrl:{
        type:String
    },
    favarates:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Podcast'
    }],
    Uploads:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Podcast'
    }],
    isAdmin:[{
        type:Boolean,
        default:false
    }]
})

module.exports=mongoose.model('User',UserSchema);