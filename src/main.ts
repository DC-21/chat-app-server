import express from 'express';
import {json, urlencoded} from 'body-parser';
import mongoose from 'mongoose';

const app = express();
app.use(urlencoded({
    extended:true
}));
app.use(json());

const start =async ()=>{
    if(!process.env.MONGO_URI) throw new Error('MONGO_URI is required');
    mongoose.connect(process.env.MONGO_URI);
}
start();
app.listen(8000,()=>{
    console.log("server is running on port 8k");
})