const express=require('express');
const app=express();
const mongodb=require('mongodb');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotEnv=require('dotenv').config();
const bcrypt=require('bcrypt');
//const url="mongodb://localhost:27017";
const url=process.env.DB;

app.use(bodyParser.json());
app.use(cors());

//Entering Details Of New User
//1.Employee
app.post("/newemployee", async(req,res)=>{
    
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm");
        db.collection("employees").insertOne({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password
        });
        res.send("done");
        client.close(); 

    }catch(err){
        console.log(err);
    }
})
//2.Manager
app.post("/newmanager", async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm");
        db.collection("managers").insertOne({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password
        });
        res.send("done");
        client.close(); 

    }catch(err){
        console.log(err);
    }
})
//3.Admin
app.post("/newadmin", async(req,res)=>{
    try{
        console.log(req.body);
        let client=await mongodb.connect(url);
        let db=client.db("crm");
        db.collection("admins").insertOne({
            "firstname":req.body.firstname,
            "lastname":req.body.lastname,
            "email":req.body.email,
            "password":req.body.password
        });
        res.send("done");
        client.close(); 

    }catch(err){
        console.log(err);
    }
})

//Getting the Details of Users(During Login)
//1.Admin
app.get('/getadmin/:email', async(req,res)=>{
    console.log(req.params)
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm");
        let data=await db.collection("admins").findOne({email:req.params.email});
        res.send(data);

    }catch(err){
        console.log(err);
    }
})/*
//2.Manager
app.get('/getmanager/:email', async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm");
        let data=await db.collection("managers").findOne({email:req.params.email}).toArray();
        res.send(data);

    }catch(err){
        console.log(err);
    }
})
*/

//3.Employee
app.get('/getemployee/:email', async(req,res)=>{
    console.log(req.body)
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm");
        let data=await db.collection("employees").findOne({email:req.params.email});
        console.log(data.leads);
        res.send(data);

    }catch(err){
        console.log(err);
    }
})

//Getting The Details(For validating)
//1.Admin
app.get('/admin', async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm");
        let data=await db.collection("admins").find().toArray();
        res.send(data); 


    }catch(err){
        console.log(err);
    }
})
//2.Manager
app.get('/manager', async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm");
        let data=await db.collection("managers").find().toArray();
        res.send(data); 


    }catch(err){
        console.log(err);
    }
})
//3.Employee
app.get('/employee', async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("crm");
        let data=await db.collection("employees").find().toArray();
        res.send(data); 


    }catch(err){
        console.log(err);
    }
})
//Clients and Leads



app.listen(process.env.PORT||4040,()=>{
    console.log("listening");
})