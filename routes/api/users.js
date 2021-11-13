var express = require("express");

var router = express.Router();


router.get("/", function(req,res){
    res.json("code for users api");
})


module.exports = router; 