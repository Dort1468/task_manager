import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    let token;

    // 先檢查 cookie
    if (req.cookies?.token) {
      token = req.cookies.token;
    }
    // 再檢查 Authorization header
    else if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Not authorized. Try login again.",
      });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decodedToken.userId).select(
        "isAdmin email"
      );

      if (!user) {
        return res.status(401).json({
          status: false,
          message: "User not found. Try login again.",
        });
      }

      req.user = {
        email: user.email,
        isAdmin: user.isAdmin,
        userId: decodedToken.userId,
      };

      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({
        status: false,
        message: "Token invalid or expired. Please login again.",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      status: false,
      message: "Not authorized. Try login again.",
    });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin.",
    });
  }
};

export { isAdminRoute, protectRoute };
