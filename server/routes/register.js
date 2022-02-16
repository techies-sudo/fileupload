const express = require("express");
const registerRouter = express.Router();
const { body, validationResult } = require("express-validator");
registerRouter.use(express.json());
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const salt = 10;

registerRouter.post(
  "/",
  body("fname").not().isEmpty(),
  body("lname").not().isEmpty(),
  body("email").isEmail(),
  body("password")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("Must be atleast 8 letter long"),
  body("rePassword").not().isEmpty(),
  body("rePassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords should match"),
  async function (req, res) {
    const { fname, lname, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      console.log(user)
      if (user) {
        return res.status(400).send({ msg: "user already exist" });
      }
      bcrypt.hash(password, salt, async (err, hash) => {
        try {
          newUser = await prisma.user.create({
            data: { fname: fname, lname: lname, email: email, password: hash },
          });
          return res.send(`User = ${newUser}`);
        } catch (error) {
          return res.status(500).send({ msg: error });
        }
      });
    } catch (error) {
      return res.status(500).send({ msg:"internal server error" });
    }
  }
);

module.exports = registerRouter;
