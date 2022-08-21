const express = require('express')
const cors = require('cors')
const app = express()
const expressFileUpload = require('express-fileupload')
const path = require('path')

app.use(express.json())
app.use(cors())
app.use(expressFileUpload({
    useTempFiles:true,
    tempFileDir:path.join(__dirname,'tmp'),
    createParentPath:true,
    limits:{fieldSize:1024}
}))

app.post('/upload',async(req,res)=>{
const file = req.files.uploadFile //this upload file comign form ui
const nameOfFile = file.name
console.log(nameOfFile);
const size = file.data.length  
const extension = path.extname(nameOfFile)
const allowedExtensions = /png|jpeg|jpg|gif/
if(! allowedExtensions.test(extension) )return  res.json({extension:"extension not supported"})
if(size > 5000000)   return res.json({sizeExceed:"exceeded limit of 5mb"}) 
const md5 = file.md5

const fileName = new Date().getTime().toString() + path.extname(file.name)

const uploadedFile = path.join(__dirname,'uploads',fileName)

if(file.truncated){
    throw new Error('file size is too big..')
} 
await file.mv(uploadedFile)
//res.json({fileName: nameOfFile,filePath:`/uploads/${file.name}`})
res.json({fileName: nameOfFile,filePath:uploadedFile})

})

///////////////////////
// app.get('/files',async(req,res)=>{

// })




app.listen(8001,console.log(`server is listening on 8001`))