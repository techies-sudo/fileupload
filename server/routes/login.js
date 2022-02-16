const express = require("express");
const loginRouter = express.Router();
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const salt = 10;

const prisma = new PrismaClient();
loginRouter.use(express.json());

loginRouter.post(
  "/",
  body("email").isEmail(),
  body("password")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("Must be atleast 8 letter long"),
  async function (req, res) {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      console.log(user);
      if (user) {
        const result = await bcrypt.compare(password, user.password);
        
        if (result) {
          
       const token= jwt.sign({ id: user.id }, process.env.PLAINTEXT, {
            expiresIn: 60*60
          });
          return res.status(200).json({ msg: "authenticated",token});
        }
        return res.status(200).send({ msg: "Incorrect password or user name" });
      }
      return res.status(200).send({ msg: "Incorrect password or user name" });
    } catch ( error) {
      return res.status(500).send({ msg: "Internal server error" ,error});
    }
  }
);

module.exports = loginRouter;
