const { Router } = require("express");
const { signUpPage, registerUserHandler, loginPage, loginUserHandler, mainPage } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const router = Router();

router.route("/signup")
    .get(signUpPage)
    .post(registerUserHandler);

router.route("/login")
    .get(loginPage)
    .post(loginUserHandler);

router.route("/main").get(protect, mainPage);
    
module.exports = router;