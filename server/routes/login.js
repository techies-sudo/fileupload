
const express = require('express')
const loginRouter = express.Router()

loginRouter.use(express.json());

loginRouter.post('/', function(req, res) {
  const { email,password} = req.body;
  console.log(req.body)
  res.send(`Name ${password}, desc ${email}`);
});

module.exports = loginRouter