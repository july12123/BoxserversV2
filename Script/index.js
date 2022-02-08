var stats = require('pc-stats')
const detect = require('detect-port');
const express = require('express')
const app = express()
const port = 8080
var time = ""
var stats1 = ""
var portlist = [
    {"Name":"Terraria","Port":7777},
    {"Name":"Minecraft","Port":25565},
    {"Name":"Cam System","Port":8090}
]
portlist.forEach(Element => {
    Element.Status = "Unknown"
});

app.get('/', (req, res) => {
    res.json({"stats":[stats1],"portlist":portlist})
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

var loop = setInterval(Update,60000)
Update()
function Update(){
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