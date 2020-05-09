var express = require('express');
var router = express.Router();

const path = require('path');
const fs = require('fs');
let directoryPath = "C:/Users/parik/OneDrive/Desktop/Courses/vuetify-backend/backend/public";


router.get('/*', function(req, res){
  const paramsArray = req.params[0].split('/')
  let newPath = directoryPath
  paramsArray.forEach(function(param){
    newPath = path.join(newPath, param);
  })
  
  console.log(newPath)
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
// fs.readdir(directoryPath, function (err, allFiles) {
  //   //handling error
  //   if (err) {
  //       return console.log('Unable to scan directory: ' + err);
  //   } 
  //   //listing all files using forEach
  //   allFiles.forEach(function (file) {
  //       // Do whatever you want to do with the file
  //       fs.stat(directoryPath + `/${file}`, function(err,stats) {
  //         console.log("Is file ", file," a directory? ",stats.isDirectory())
  //         if(stats.isDirectory())
  //           folders.push(file)
  //         else
  //           files.push(file)
  //       })
  //       // console.log(file.); 
  //   });
  //   res.send({
  //       folders: folders,
  //       files: files
  //   })
// })