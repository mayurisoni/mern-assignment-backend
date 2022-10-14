const mongoose=require("mongoose")
const express = require("express")
const router=express.Router();
const userController = require("../controllers/users")
router.post("/",userController.user_register)
router.post("/login",userController.user_login)

module.exports = router;