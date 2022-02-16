const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const dotenv = require('dotenv')
const {PrismaClient} = require('@prisma/client') 
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const uploadRouter = require('./routes/upload')

dotenv.config()

const prisma = new PrismaClient()
const app = express()
const port = process.env.PORT||5000

app.use(cors(
    {
        origin:"http://localhost:3001"
    }
))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname,"build")))

app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"))
})
app.use("/register",registerRouter)
app.use("/login",loginRouter)
app.use('/upload',uploadRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))