var stats = require('pc-stats')
const path = require('path');
const express = require('express')
const fs = require('fs')
const detect = require('detect-port');
var time = ""
var stats1 = ""
var portlist = [
    {"Name":"Web","Port":80},
    {"Name":"Secure Web","Port":443},
    {"Name":"LU Client DB","Port":5000},
    {"Name":"Terraria","Port":7777},
    {"Name":"VAC","Port":26900},
    {"Name":"SVEN","Port":27015},
    {"Name":"Minecraft","Port":25565},
    {"Name":"Unturned","Port":27016},
    {"Name":"Cam System","Port":8090}
]
Update()
module.exports = (global) => {
    portlist.forEach(Element => {
        Element.Status = "Unknown"
    });

    const api = `/api` 

    global.app.get('/api',(req, res)=>{
        res.send("Api Version 1.0.0")
    })

    global.app.get('/404',(req, res)=>{
        res.status(404).send("404")
    })

    global.app.get('/activate', (req,res) => {
        res.redirect("http://boxserver.freeddns.org:5000/activate");
    })

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
        var Export = JSON.parse(`{"LastUpdated":${time},"ServerTime":${Date.now()},"CPU":${Math.round(total)},"Ram":{"total":${parseFloat(stats1.ram.total)},"used":"${parseFloat(stats1.ram.total)-parseFloat(stats1.ram.free)}","unit":"${stats1.ram.unit}"},"Data":[${Status}]}`)
        res.json(Export)
    })
    var loop = setInterval(Update,60000)
}

function Update(){
  time = Date.now()
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
  })
  );
}