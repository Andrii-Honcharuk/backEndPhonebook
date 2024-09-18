import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.js";

async function auth(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).send({ message: "Invalid token" });
  }

  const [bearer, token] = authorizationHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const logUser = await User.findById(decode.id);
    if (!logUser || logUser.token !== token) {
      return res.status(401).send({ message: "Invalid token or user TOKEN" });
    }
    req.user = {
      id: decode.id,
      email: decode.email,
    };
  } catch {
    res.status(401).send({ message: "Invalid token TOKEN" });
  }

  next();
}

export default auth;
