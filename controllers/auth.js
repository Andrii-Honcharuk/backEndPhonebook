import user from "../models/user.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function registerUser(req, res, next) {
  try {
    const { name, nickname, password, email } = req.body;
    // console.log("req.body", req.body);
    const normalizedEmail = email.trim().toLowerCase();
    // console.log("normalizedEmail", normalizedEmail);

    // Шукаємо користувача за email нечутливим до регістру
    const user = await User.findOne({
      email: normalizedEmail,
    });
    // console.log("user", user);

    if (user !== null) {
      //   console.log("user !== null");
      return res.status(409).send({ message: "User already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const regUser = await User.create({
      name,
      nickname,
      password: passwordHash,
      email: normalizedEmail,
    });
    // console.log("regUser", regUser);
    res.status(201).send(`Register new User \n -----------\n ${regUser}`);
  } catch (error) {}
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const emailInLowerCase = email.trim().toLowerCase();

    const loggedUser = await User.findOne({ email: emailInLowerCase });

    if (!loggedUser) {
      //   console.log("user", loggedUser);
      res.status(401).send({ message: "Incorrect login or password" });
    }

    const isMatch = await bcrypt.compare(password, loggedUser.password);

    if (!isMatch) {
      //   console.log("password", isMatch);
      res.status(401).send({ message: "Incorrect login or password" });
    }

    const token = jwt.sign(
      { id: loggedUser._id, name: loggedUser.name },
      process.env.JWT_SECRET,
      { expiresIn: "2 days" }
    );

    await User.findByIdAndUpdate(loggedUser._id, { token });

    res.send({ token });
    // console.log("loggedUser", loggedUser);
  } catch (error) {
    next(error);
  }
}

async function logoutUser(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export default { registerUser, loginUser, logoutUser };
