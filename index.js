
const express = require("express");
const bodyParser=require("body-parser");
const app = express();
const cors=require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://chaitanyasaim5:Ms.dhoni07@booksdb.wwysrlp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





    client.connect();
    
    // app.get("/",async (req,res)=>{
        
        //     const findResult = await collection.find({}).toArray();
        //     //console.log('Found documents =>', findResult);
        //     let length=findResult.length-1
        //     res.send(findResult[length]);
        // })
        
        
app.post("/home",async(req,res)=>{
        const input=req.body.input;
        console.log(input);
        const collection=client.db().collection("devices");
    
    try{
        await collection.insertOne({ name:input});
        res.send("Successfully Registerd");
    }catch(e){
        console.log(e);
        res.send("Error");
    }
    
})

app.post("/login",async(req,res)=>{
    const userName = req.body.username
    const password = req.body.password
    const collection=client.db().collection("login");
    try{
        await collection.insertOne({username:userName,password:password})
        res.send("Succesfully registered")
    }catch(e){
        console.log("Error")
    }
    
})

app.get("/login",async(req,res)=>{
    const collection = client.db().collection("login")
    const findResult = await collection.find({}).toArray();
    res.send(findResult)
})

app.post("/signup",async(req,res)=>{
    const userName = req.body.username
    const password = req.body.password
    const collection = client.db().collection("signup")
    try{
        await collection.insertOne({username:userName,password:password})
    }catch(e){
        console.log("Error")
    }
})

app.get("/",async(req,res)=>{
    const collection = client.db().collection("devices")
    const findResult = await collection.find({}).toArray();
    res.send(findResult);
})





app.listen(process.env.PORT||4000,()=>{
    console.log("Backend Server Running");

})
//5e264e43519f40b492f58f1d797f71f4

