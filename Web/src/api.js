var stats = require('pc-stats')
const fetch = require('cross-fetch');
const detect = require('detect-port');
const {script,url} = require("../config.json")
var stats1 = ""
var portlist = [
  {"Name":"Terraria","Port":7777},
  {"Name":"Minecraft","Port":25565},
  {"Name":"Cam System","Port":8090}
]
Update()
module.exports = (global) => {
    //adds Status to each portlist
    portlist.forEach(Element => {
        Element.Status = "Unknown"
    });
    //default api path
    const api = `/api` 
    //sends api version
    global.app.get('/api',(req, res)=>{
        res.send("Api Version 1.0.0")
    })
    //404 page for Legouniverse
    global.app.get('/404',(req, res)=>{
        res.status(404).send("404")
    })
    //redirects to activate page for lego universe
    global.app.get('/activate', (req,res) => {
        res.redirect("http://boxserver.freeddns.org:5000/activate");
    })
    //sends computer ram, cpu and ports
    global.app.get(api+'/status',(req,res)=>{
        var Status = ""
        var total=0;
        stats1.cpu.threads.forEach(e =>{
          total = total + e.usage
        })
        try{total = total/stats1.cpu.threads.length}catch{}
        portlist.forEach(e => {if(Status!=""){
          Status = Status + ","
        };
      
        Status = Status + `{"Name":"${e.Name}","Port":${e.Port},"Status":"${e.Status}"}`});
        var Export = JSON.parse(`{"CPU":${Math.round(total)},"Ram":{"total":${parseFloat(stats1.ram.total)},"used":"${parseFloat(stats1.ram.total)-parseFloat(stats1.ram.free)}","unit":"${stats1.ram.unit}"},"Data":[${Status}]}`)
        res.json(Export)
    })
    //runs the update function every min
    var loop = setInterval(Update,60000)
}
//gets computer information
async function Update(){
  if(script == true){
    try{
      var response = await fetch(url)
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      var dat = await response.json();
      stats1 = dat.stats[0]
      portlist = dat.portlist
    }catch(err){
      console.error(err)
    }
    return
  }
    stats().then((statistics) => {
      stats1 = statistics
    }).catch((err) => {
      console.log(err)
    })
    portlist.forEach(data =>detect(data.Port, (err, _port) => {
      if (err) {
        console.log(err);
      }
      
      if (data.Port == _port) {
        data.Status = "Down"
      } else {
        data.Status = "Up"
      }
    }));
}