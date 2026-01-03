const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async(req, res, next) => {
  // Middleware logic for authentication
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid no token found");
  }
  const token = authHeader.split(" ")[1];
  // Verify token logic here (e.g., using jwt.verify)
  // If valid, attach user info to req object
  // If invalid, throw UnauthenticatedError
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid token");
    
  }
}
module.exports = authenticationMiddleware;