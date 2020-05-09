var express = require('express');
var router = express.Router();

const path = require('path');
const fs = require('fs');
let directoryPath = "C:/Users/parik/OneDrive/Desktop/Courses/file-structure-app/vuetify-backend/public";

router.get('/*', function(req, res){
  const paramsArray = req.params[0].split('/')
  let newPath = directoryPath
  paramsArray.forEach(function(param){
    newPath = path.join(newPath, param);
  })

  let folders = []
  let files = []
  let allFiles = fs.readdirSync(newPath)
  allFiles.forEach(function(file){
    let fileStats = fs.statSync(newPath + `/${file}`)
    if(fileStats.isDirectory())
      folders.push(file)
    else
      files.push(file)
  })
  res.json({
    folders:folders,
    files:files
  })

})

module.exports = router;