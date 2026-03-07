import jwt from "jsonwebtoken";
import "dotenv/config";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.usersToken;
    if (!token) {
        return res.status(401).json({success: false, message: "Please Login."});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: "Unauthorized"});
    }
}

export const adminMiddleware = async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return res.status(401).json({success: false, message: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        if (req.user.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({success: false, message: "Forbidden"});
        }
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: "Unauthorized"});
    }
}