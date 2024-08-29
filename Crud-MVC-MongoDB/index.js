const express = require('express');

const port = 8000;

const app = express();

app.set('view engine','ejs');

const db = require('./config/db');

app.use(express.urlencoded());

const path = require('path');

app.use('/uploads',express.static(path.join(__dirname,"uploads")));

app.use('/',require('./routes/indexRoute'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server start on port :- ${port}`);  
})