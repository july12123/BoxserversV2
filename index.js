var global = [];
const express = require('express');
const https = require('https');
const http = require('http');
const app = express();
const fs = require('fs');
const [Phttp,pHttps] = [80,443];

const options = {
  key: fs.readFileSync(__dirname+'/src/Keys/key.pem'),
  cert: fs.readFileSync(__dirname+'/src/Keys/cert.pem')
};

http.createServer(app).listen(Phttp)
https.createServer(options, app).listen(pHttps)
console.log(`Server running on Http:${Phttp}, Https:${pHttps}`)

app.listen = function () {
  var server = http.createServer(this)
  return server.listen.apply(server, arguments)
};

global.app = app

var mods = ['api','main'];

mods.forEach(e=> {
  try{
  require(`./src/${e}.js`)(global);
}catch(err){
  console.error(`Failed to Start: `,e,err)
}finally{
  console.log("Started: ",e)
}
})