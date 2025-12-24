const { Router } = require("express");
const { signUpPage, registerUserHandler, loginPage, loginUserHandler, mainPage, logoutHandler } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const router = Router();

router.route("/signup")
    .get(signUpPage)
    .post(registerUserHandler);

router.route("/login")
    .get(loginPage)
    .post(loginUserHandler);

router.route("/main").get(protect, mainPage);

router.route("/logout").post(protect, logoutHandler);
    
module.exports = router;