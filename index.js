var global = [];
const express = require('express');
const https = require('https');
const http = require('http');
const app = express();
const fs = require('fs');
const [PHttp,PHttps] = [80,443];

//get certs
try{
const options = {
  key: fs.readFileSync(__dirname+'/src/Keys/key.pem'),
  cert: fs.readFileSync(__dirname+'/src/Keys/cert.pem')
};
}catch{}

//run server on ports defined on Phttp and Phttps
try{http.createServer(app).listen(PHttp)}catch{
  console.error(`HTTP Failed to start on port: ${PHttp}`)
}
try{https.createServer(options, app).listen(PHttps)}catch{
  console.error(`HTTPs Failed to start on port: ${PHttps}`)
}
console.log(`Server Started`)

//starts the server
app.listen = function () {
  var server = http.createServer(this)
  return server.listen.apply(server, arguments)
};

//global app
global.app = app

//function files to make code cleaner and spereate funtions
var mods = ['api','main'];

// runs specified files in /src
mods.forEach(e=> {
  try{
  require(`./src/${e}.js`)(global);
}catch(err){
  console.error(`Failed to Start: `,e,err)
}finally{
  console.log("Started: ",e)
}
})