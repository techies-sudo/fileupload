const { Router } = require("express")
const multer = require('multer')

const uploadRouter = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

const upload = multer({ storage }).array('data') // name should be same as formData

uploadRouter.post('/', function (req, res) {
    upload(req,res,(err)=>{
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
   return res.status(200).send("files uploaded")
    })
})

module.exports = uploadRouter