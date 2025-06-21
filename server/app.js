const express=require('express');
const { getImportLogs } = require('./controllers/logController');
const cors = require('cors');


const app=express();

app.use(cors());
app.use(express.json());


app.get('/api/import-logs', getImportLogs);

app.get("/",(req,res)=>{
    res.send("Job Importer Setup");
});


module.exports=app;