const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide all required fields (name, email, password)."
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long."
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "An account with this email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User created successfully."
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "An internal server error occurred while registering the user."
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful.",
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "An internal server error occurred while logging in."
        });
    }
});


router.get("/profile", auth, (req, res) => {
    res.json(req.user);
});

router.get("/admin", auth, role("admin"), (req, res) => {
    res.json({
        message: "Welcome admin"
    });
});

module.exports = router;