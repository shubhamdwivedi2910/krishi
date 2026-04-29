const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

// ✅ REGISTER
exports.register = async (req, res) => {
  try {
    const { fullName, mobile, address, shopName, password, confirmPassword } = req.body;

    // 🔴 Validation
    if (!fullName || !mobile || !address || !shopName || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 🔍 Check existing user
    const existingUser = await User.findOne({ where: { mobile } });
    if (existingUser) {
      return res.status(400).json({ message: "Mobile already exists" });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = await User.create({
      fullName,
      mobile,
      address,
      shopName,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        fullName: user.fullName,
        mobile: user.mobile,
        shopName: user.shopName
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ✅ LOGIN
exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({ message: "Mobile and password required" });
    }

    // 🔍 Find user
    const user = await User.findOne({ where: { mobile } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔐 Compare password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 🔑 Generate token
    const token = jwt.sign(
      { id: user.id, mobile: user.mobile },
      SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        mobile: user.mobile,
        shopName: user.shopName
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};