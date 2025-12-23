const asyncHandler = require("express-async-handler");
const { auth } = require("../config/firebase");
const { createUserWithEmailAndPassword } = require("firebase/auth");

const signUpPage = (req, res) => {
    res.render("auth/signup");
}

const registerUserHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are mandatory"
        });
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return res.status(201).json({
            message: "User registered"
        });
    } catch (error) {
        // Firebase-known errors → client error
        if (
            error.code === "auth/email-already-in-use" ||
            error.code === "auth/invalid-email"
        ) {
            return res.status(400).json({
                message: error.message
            });
        }

        // Anything else → server error
        return res.status(500).json({
            message: "Something went wrong. Please try again later."
        });
    }
});


module.exports = { 
    signUpPage, 
    registerUserHandler
};