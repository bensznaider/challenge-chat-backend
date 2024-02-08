const { generateToken, validateToken } = require("../config/tokens.js");
const { Users } = require("../db/models/index.js");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const possibleName = await Users.findOne({
      where: { name: req.body.name },
    });
    if (possibleName) {
      return res.status(409).send(`${req.body.name} has already been registered as a user.`);
    }
    await Users.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

//TEMPORARY
const getUsers = async (req, res) => {
  try {
    const existingUsers = await Users.findAll();
    if (existingUsers) {
      return res.status(200).send(existingUsers);
    }
    else {return res.status(400).send("No users found.")}
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.body.name },
    });
    if (!user) return res.sendStatus(401);
    const isValid = await user.validatePassword(req.body.password);
    if (!isValid) return res.sendStatus(401);
    const payload = {
      id: user.dataValues.id,
      email: user.dataValues.email,
    };
    const token = generateToken(payload);
    const response = {userId: user.dataValues.id, token: token}
    res.send(response);
  } catch (error) {
    res.status(404).send(error);
  }
};

const me = async (req, res) => {
  try {
    const data = await validateToken(req.body.token);
    res.status(200).send(data.user);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(400).send("Invalid token or token tampered");
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(401).send("Token expired");
    } else {
      res.status(500).send("Internal server error");
    }
  }
};


module.exports = { signup, login, me, getUsers };
