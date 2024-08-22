import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  // console.log("token:", token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      // console.log("middleware user: ", req.user);
      next();
    } catch (error) {
      res.status(401).json({
        message: "Not autorized, token failed",
      });
    }
  } else {
    res.status(401).json({
      message: "Not autorized, token not found",
    });
  }
};

export { authMiddleware };
