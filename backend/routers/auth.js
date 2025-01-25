const router=require("express").Router()
const {signup,login,logout,getUser}=require("../controllers/auth");

router.post("/signup",signup)
router.get("/user",getUser)
router.post("/login",login)

router.post("/logout",logout)


module.exports=router;