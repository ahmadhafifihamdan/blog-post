const { Router } = require("express");
const { signUpPage, registerUserHandler } = require("../controllers/auth.controller");

const router = Router();

router.route("/signup")
    .get(signUpPage)
    .post(registerUserHandler);

module.exports = router;