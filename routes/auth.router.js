const { Router } = require("express");
const { signUpPage, registerUserHandler, loginPage, loginUserHandler, protectMe } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const router = Router();

router.route("/signup")
    .get(signUpPage)
    .post(registerUserHandler);

router.route("/login")
    .get(loginPage)
    .post(loginUserHandler);

router.route("/protected-test").get(protect, protectMe);
    
module.exports = router;