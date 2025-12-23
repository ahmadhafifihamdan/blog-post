const { Router } = require("express");
const { signUpPage, registerUserHandler, loginPage, loginUserHandler } = require("../controllers/auth.controller");

const router = Router();

router.route("/signup")
    .get(signUpPage)
    .post(registerUserHandler);

router.route("/login")
    .get(loginPage)
    .post(loginUserHandler);
    
module.exports = router;