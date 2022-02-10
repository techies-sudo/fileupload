
const express = require('express')
const registerRouter = express.Router()

registerRouter.use(express.json());

registerRouter.post('/', function(req, res) {
  const { fname, lname,email,password,rePassword } = req.body;
  res.send(`Name ${fname}, desc ${email}`);
});

module.exports = registerRouter