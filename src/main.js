const path = require('path');
const express = require('express')
module.exports = (global) => {
    //template engine
    global.app.set('view engine', 'ejs');
    //defines public
    global.app.use('/public',express.static(path.join(__dirname, 'public')))
    //fav icon
    global.app.get('/favicon.ico', (req, res) => {
        res.sendFile(path.join(__dirname, `./favicon.ico`))
    })
    //sets main page
    global.app.get('/', (req, res) => {
        res.render("home")
    })
    //status page
    global.app.get('/status',(req,res) => {
        res.render("status")
    })
    //demopage
    global.app.get('/demo/home',(req,res)=>{
        res.render("demoHome")
    })
    global.app.get('/demo/price',(req,res)=>{
        res.render("demoPrice")
    })
    global.app.get('/demo/about',(req,res)=>{
        res.render("demoAbout")
    })
    
    //404 page
    global.app.use(function (req, res, next) {
        res.status(404).render("404")
    })
}