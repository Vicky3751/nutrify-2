//step 1 setup the server
var express = require("express");
var path = require("path");
var app = express();
app.set("port" , process.env.PORT|| 3000);

//step 4 database connections and dependencies
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");
var bodyParser = require("body-parser");

//step7 set up the parssport
var setUpPassport = require("./setuppassport")

//step 5 connect mongodb
var params =require("./params/params");
mongoose.connect (params.DATABASECONNECTION, {useUnifiedTopology :true})
setUpPassport();

// step 6 set bodyparser form accessing the text and passwords in form 
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret : "vickycandoanything",
    resave : false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//step 3 import the router here
app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

// step 2 for rendering the ejs files we set an engine path and view type
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(app.get("port"), function (){
    console.log("server started");
})