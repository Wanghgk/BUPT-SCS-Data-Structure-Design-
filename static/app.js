const express = require("express");
const path = require("path");

const image = express();

const cors = require('cors')
image.use(cors())

image.use(express.static(path.join(__dirname,"image")));

image.listen(5002,()=>{
    console.log("Tour项目图片服务器已部署在5002端口")
})