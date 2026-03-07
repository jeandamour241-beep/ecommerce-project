import db from "../models/index.js";

const {User} = db;

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const data = await User.findOne({where: {id: userId}});

    if (!data) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      name: data.name,
      email: data.email,
    });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};