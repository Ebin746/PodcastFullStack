const jwt=require("jsonwebtoken");


const genrateToken=(user)=>{
    
const payload={
    id:user._id,
    userName:user.userName
}
    return jwt.sign(payload,process.env.JWT_SECRET)
}

module.exports=genrateToken