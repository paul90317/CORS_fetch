const express=require('express');
const app=express();
const port=8081||process.env.PORT;
const path=require('path')
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'test.htm'));
})
app.listen(port,()=>{
    console.log('http://127.0.0.1:'+port+'/')
})