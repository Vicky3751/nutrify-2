var express = require("express");

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var Meal = require("../../models/meal");

var router = express.Router();

router.use(ensureAuthenticated);

router.get("/", function (req, res) {
  Meal.find({ userID: req.user._id }).exec(function (err, meals) {
    if (err) {
      console.log(err);
    }

    res.render("meal/meals", { meals: meals });
  });
});

router.get("/addmeal", function (req, res) {
  res.render("meal/addmeal");
});

router.post("/addmeal", function (req, res) {
  var newMeal = new Meal({
    title: req.body.title,
    content: req.body.content,
    calories: req.body.calories,
    userID: req.user._id,
  });

  newMeal.save(function (err, meals) {
    if (err) {
      console.log(err);
    }
    res.redirect("/meals");
  });
});

router.get("/:mealId", function (req, res) {
  Meal.findById(req.params.mealId).exec(function (err, meal) {
    res.render("meal/detailmeal", { meal: meal });
  });
});

router.get("/delete/:mealId", function (req, res) {
  Meal.findById(req.params.mealId).exec(function (err, meals) {
    let deletemeal = meals.delete();
    res.render("home/home");
  });
});

router.get("/edit/:mealId", function (req, res) {
  Meal.findById(req.params.mealId).exec(function (err, meal) {
    res.render("meal/editmeal", { meal: meal });
  });
});

router.post("/update", async function (req, res) {
  const meal = await Meal.findById(req.body.mealid);
  meal.title = req.body.title;
  meal.content = req.body.content;
  meal.calories = req.body.calories;

  try {
    let saveMeal = await meal.save();
    res.redirect("/meals");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
