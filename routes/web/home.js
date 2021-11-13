var express = require("express");
var passport =  require("passport");
var User = require("../../models/user");
var router = express.Router();

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

router.get("/", function(req,res){
    res.render("home/");
})

router.get("/home", function(req,res){
    res.render("home/home");
})

router.get("/About", function(req,res){
    res.render("home/about");
})






router.get("/login", function(req,res){
    res.render("home/login");
})

router.post("/login", passport.authenticate("login", {
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash:true
}))

router.get("/signup", function(req,res){
    res.render("home/signup");
})


router.post("/signup", function(req,res,next){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email:email}, function(err, user){
        if(err){return next(err)}
        if(user){
            req.flash("error", "There is already an acccount with the same email")
            return res.redirect("/signup")
        }

        var newUser = new User({
            username : username,
            password: password,
            email :email
        })

        newUser.save(next);
    })
},passport.authenticate("login",{
    successRedirect:"/",
    failureRedirect:"/signup",
    failureFlash:true
}))


router.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/home")
})

module.exports = router; 