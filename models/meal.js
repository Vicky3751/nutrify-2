var mongoose = require('mongoose');

var mealSchema = mongoose.Schema ({
    title : {type: 'String', required: true},
    content : {type: 'String', required: false},
    calories : {type: Number, required:true},
    createdAt : {type: 'Date', default:Date.now()},
    userID : {type: mongoose.Schema.Types.ObjectId, required:false , unique: false},
    public : {type: Boolean, default: false , required:false, unique: false}
});

var Meal = mongoose.model("Meal",mealSchema);

module.exports = Meal;


