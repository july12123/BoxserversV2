var stats = require('pc-stats')
const detect = require('detect-port');
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

const http = require('http');
const port = 8080;


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({"stats":[stats1],"portlist":portlist}));
});

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
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