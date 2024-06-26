import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  
  
  if (!token) {
    return res.json({ success: false, message: "Token not found" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log("Error verifying token:", error); // Log any errors during token verification
    res.json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
