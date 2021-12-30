const path = require('path');
const express = require('express')
const fs = require('fs')
module.exports = (global) => {
    //defines public
    global.app.use('/public',express.static(path.join(__dirname, 'public')))
    //fav icon
    global.app.get('/favicon.ico', (req, res) => {
        res.sendFile(path.join(__dirname, `./favicon.ico`))
    })
    //sets main page
    global.app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, `./pages/home.html`))
    })

    //checks to see if page exist in /pages and run it
    
    /* Notice this normally wouldn't work unless you make
    this the last bit of code as if this executed before api
    everything will break (changing the array order in index.js
    will cause this to break if main is not set last)*/
    global.app.get('/:page', (req, res) => {
        var page = req.params.page
        if(page){
            var pagedir = path.join(__dirname, `./pages/${page}.html`)
            if (fs.existsSync(pagedir)) {
                res.sendFile(pagedir)
            }
        }else{
            res.status(404).send("Sorry can't find that!")
        }
    })
    
    //404 page
    global.app.use(function (req, res, next) {
        res.status(404).send("Sorry can't find that!")
    })
}