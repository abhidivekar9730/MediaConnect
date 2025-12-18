import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization);
  console.log("JWT SECRET:", process.env.JWT_SECRET);

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);
    return res.status(401).json({ message: "Token invalid" });
  }
};
