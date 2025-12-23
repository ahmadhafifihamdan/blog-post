const { Router } = require("express");
const { signUpPage } = require("../controllers/auth.controller");

const router = Router();

router.route("/signup").get(signUpPage);

module.exports = router;