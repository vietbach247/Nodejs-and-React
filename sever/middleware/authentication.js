import jwt from "jsonwebtoken";

export const authentication = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Vui lòng đăng nhập" });
    }

    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;
    next();
  } catch (error) {
    next();
  }
};
