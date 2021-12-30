const path = require('path');
const express = require('express')
const fs = require('fs')
module.exports = (global) => {
    global.app.use('/public',express.static(path.join(__dirname, 'public')))

    global.app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, `./pages/home.html`))
    })

    global.app.get('/:page', (req, res) => {
        var page = req.params.page
        
        if(page){
            var pagedir = path.join(__dirname, `./pages/${page}.html`)
            if (fs.existsSync(pagedir)) {
                res.sendFile(pagedir)
            }
        }
    })
    
    global.app.use(function (req, res, next) {
        res.status(404).send("Sorry can't find that!")
    })
}