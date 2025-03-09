require('dotenv').config()
const express = require('express')
const nodemailer  = require('nodemailer')
const path = require('path')
const multer = require('multer')
const app = express()
const port = process.env.PORT || 4000

// Set up multer for form data
const upload = multer();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static(path.join(__dirname,'public'))) // serve the static files

app.get('/',(req,res)=>{
    res.json({message:"hloo"})
})

// nodemailer transport setup
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.APP_PASSWORD
    }
})

app.post('/send-mail',upload.none(),(req,res)=>{
    const {name,email,message} = req.body;
    console.log('name',name,"email",email)

    const mailOptions = {
        from:email,
        replyTo:email,
        to:process.env.ZOHO_MAIL,
        subject:`New Message from ${name}`,
        text:`Name:${name}\nEmail:${email}\nMessage:${message}`
        
    }

    console.log(mailOptions)

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error(error)
            res.status(500).send('Something went wrong')
        }else{
            console.log('Email sent:'+info.response)
            res.status(200).send('Message sent successfully! we will contact you soon')  
        }
    })
})

app.listen(port,()=>{
    console.log(`server is http://localhost:${port}`)
})