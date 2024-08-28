const jwt=require("jsonwebtoken");

const genrateToken=(user)=>{
    return jwt.sign({user},process.env.JWT_SECRET)
}

module.exports=genrateToken