const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const registerRouter = require('./routes/register')
const morgan = require('morgan')
const loginRouter = require('./routes/login')
const app = express()
const port = 5000

app.use(cors(
    {
        origin:"http://localhost:3001"
    }
))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname,"build")))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

const upload = multer({ storage }).array('data') // name should be same as formData
app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"))
})
app.use("/register",registerRouter)
app.use("/login",loginRouter)
app.post('/upload',(req, res) => {
    upload(req,res,(err)=>{
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
   return res.status(200).send(req.files)
    })


})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))