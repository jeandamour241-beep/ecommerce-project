import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../models/index.js";
import "dotenv/config";
const {User} = db;
export const register = async (req, res) => {
    try {
        
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({success: false, message: "Please fill all the fields"});
        }

        const existingUser = await User.findOne({where: {email: email}});
        if (existingUser) {
            return res.status(400).json({success: false, message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword});

        return res.status(201).json({success: true, message: "User created successfully", data: user});

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

export const login = async (req, res) => {
    try {
        
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({success: false, message: "Please fill all the fields"});
        }

        const user = await User.findOne({where: {email: email}});
        if (!user) {
            return res.status(400).json({success: false, message: "User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({success: false, message: "Invalid password"});
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});

        res.cookie("usersToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none"
        });

        return res.status(200).json({success: true, message: "User logged in successfully"});

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

export const userLogout = async (req, res) => {
  try {

    res.clearCookie("usersToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully"
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const admin = async (req, res) => {
    try {
        
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({success: false, message: "Please fill all the fields"});
        }

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASS) {
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET_KEY, {expiresIn: "24h"});

        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none"
        });

        return res.status(200).json({success: true, message: "Admin logged in successfully"});

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

export const isAuth = async (req, res) => {
    try {
        
        return res.json({success: true});

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

export const getAllUsers = async (req, res) => {
    try {
        
        const users = await User.findAll({
            atribute: ["name", "email"],
        });

        if (!users) {
            return res.json({success: false, message: 'Something went wrong.'});
        }

        return res.json({success: true, users});

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

export const isAdminAuth = async (req, res) => {
    try {
        
        return res.json({success: true});

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

export const adminLogout = async (req, res) => {
  try {

    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully"
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};