import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail";

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = Math.floor(
      10000 + Math.random() * 90000,
    ).toString();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isApproved: role === "seller" ? false : true,
      verificationToken,
    });

    try {
      await sendEmail({
        email,
        subject: "Verify Your Email - HUNTIT SOLUTIONS",
        message: `<p>Your verification code is <strong>${verificationToken}</strong></p><p>Please enter this code on the verification page to activate your account</p>`,
      });
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);

      // User created regardless
    }

    res.status(201).json({
      message:
        "User registered successfully. Please check your email for the verification code.",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email or contact support for assistance.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        message:
          "Your account has been blocked. Please contact support for assistance.",
      });
    }

    // token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
        message: "Login successful",
        token,
        user
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// Fetch profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json({
            success: true,
            user
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

// Email Verification
export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        message: "Email and verification code are required."
      });
    }

  } catch (err) {}
}
