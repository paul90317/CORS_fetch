const express=require('express');
const app=express();
const port=8080||process.env.PORT;
const path=require('path');
const fs=require('fs');
const fetch=require('node-fetch');

async function fetch_and_send(req,res){
    try{
        let url=req.query.url;
        let opt={};
        opt['method']=req.method;
        if(req.body)opt['body']=req.body;
        opt['headers']={};
        if(req.headers['user-agent'])opt['headers']['user-agent']=req.headers['user-agent'];
        if(req.headers['content-type'])opt['headers']['content-type']=req.headers['content-type'];
        if(req.headers['set-cookies'])opt['headers']['set-cookies']=req.headers['set-cookies'];
        if(req.headers['cookies'])opt['headers']['cookies']=req.headers['cookies'];
        let _res=await fetch(url,opt);
        let data=await _res.text();
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Method','GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers','Content-Type');
        res.send(data);
    }catch(err){
        res.send(err);
    }
    
}
app.get('/',(req,res,next)=>{
    if(req.query.url)return next();
    res.sendFile(path.join(__dirname,'src/index.htm'));
})
app.get('/',(req,res)=>{
    fetch_and_send(req,res);
})
app.head('/',(req,res)=>{
    fetch_and_send(req,res);
})
app.all('/',express.text(),(req,res)=>{
    fetch_and_send(req,res);
})
app.get('/CORS_fetch.js',(req,res)=>{
    let data=fs.readFileSync(path.join(__dirname,'src/CORS_fetch.js'),'utf-8');
    data=data.replace('{host}',req.get('host'));
    res.send(data);
})
app.listen(port,()=>{
    console.log(`http://127.0.0.1:${port}/?url=https://www.ptt.cc/bbs/Gossiping/index.html`);
})