// Authentication middleware to protect admin routes
const protectAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Authentication token missing.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Invalid token format.",
      });
    }

    // Decode token: base64 encoded "email:timestamp:secret"
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const secretKey = process.env.JWT_SECRET || "oshn_admin_secret_2026";

    if (!decoded.includes(secretKey)) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired session token.",
      });
    }

    const [email] = decoded.split(":");
    req.admin = { email };
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Authentication verification failed.",
    });
  }
};

module.exports = { protectAdmin };
