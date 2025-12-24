const asyncHandler = require("express-async-handler");
const { auth } = require("../config/firebase");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const jwt = require("jsonwebtoken");
const { JWT_AUTH_TOKEN } = require("../config/env.config");

const signUpPage = (req, res) => {
    if (req.cookies.authentication_token) {
        return res.redirect("/main");
    }
    res.render("auth/signup");
}

const loginPage = (req, res) => {
    if (req.cookies.authentication_token) {
        return res.redirect("/main");
    }
    res.render("auth/login");
}

const mainPage = (req, res) => {
    res.render("main")
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

const loginUserHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are mandatory"
        });
    }
    
    if (!JWT_AUTH_TOKEN) {
        res.status(500);
        throw new Error("JWT_AUTH_TOKEN is missing in env");
    }
    
    try {
        await signInWithEmailAndPassword(auth, email, password);
        const authentication_token = jwt.sign({ email }, JWT_AUTH_TOKEN, { expiresIn: "30m" });
        res.cookie("authentication_token", authentication_token, { httpOnly: true });
        return res.redirect("/main");
    } catch (error) {
        if (
            error.code === "auth/invalid-credential" ||
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
    registerUserHandler,
    loginPage,
    loginUserHandler,
    mainPage
};