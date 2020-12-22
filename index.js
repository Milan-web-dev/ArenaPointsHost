"use strict";

(async () => {
    const express = require('express')
const fetch = require('node-fetch')
const jsonfile = require('jsonfile')
const path = require('path')
const Discord = require('discord.js')
const rateLimit = require('express-rate-limit')
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./utils/tokenify/index");
const app = express()
app.get('/JS/:file', function (req, res) {
    res.sendFile(path.join(__dirname + `/JS/${req.params.file}`));
})
app.get('/CSS/:file', function (req, res) {
    res.sendFile(path.join(__dirname + `/CSS/${req.params.file}`));
})

app.get('/IMG/:file', function (req, res) {
    res.sendFile(path.join(__dirname + `/IMG/${req.params.file}`));
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + `/HTML/index.html`));
    
})

app.post('/gen/', function (req, res) {
    if (!req.headers.body) {
        res.status(400)
        res.send({code: 400, message: "ERR_MISSING_BODY"})
    } else {
        let creds = JSON.parse(req.headers.body)
        if (creds.length != 2) {
            res.status(400)
            res.send({code: 400, message: "ERR_BAD_PARAM"})

        } else {
            try{
                _1.tokenify(creds[0],creds[1])
               setInterval(async function(){
                _1.tokenify(creds[0],creds[1]).then(x => {
                    let token = x.authToken
                    let id = x.userID 
                    const genPoints = require('./utils/arenaPoints').genPoints
                        genPoints(token,id)
                })
        },75000)
                
                
            }catch{
                res.status(403)
                res.send({code: 403, message: "ERR_BAD_CREDS"})
            }
        }   
    }
})

app.listen(3000, () => {
    console.log(`Site is up on port 3000`)
})
})()