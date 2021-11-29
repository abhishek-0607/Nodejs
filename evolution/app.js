
const express = require("express");
const mongoose = require("mongoose");

const connect = ()=>{
    return mongoose.connect("mongodb+srv://ab360:mongo2244@cluster0.ntjha.mongodb.net/test")
}

// schema for jobs

const jobSchema = new mongoose.Schema({
    job_title:{type:String, required:true, unique:true},
    rating:{type:Number, required:true},
    work_from_home:{type:Boolean,required:false},
    skill_ids:[
        {type: mongoose.Schema.Types.ObjectId,
        ref:"skill",
        required:true
    }],
    city_ids:[
        {type: mongoose.Schema.Types.ObjectId,
        ref:"city",
        required:true
    }]
},
{
    versionKey:false,
    timeStamps: true
})

const Job = mongoose.model("job",jobSchema);

//schema for skill
const skillSchema = new mongoose.Schema({
    skill_name:{type:String, required:true, unique:true}

},
{
    versionKey:false,
    timeStamps: true
})

const Skill = mongoose.model("skill",skillSchema);

//schema for city

const citySchema = new mongoose.Schema({
    city_name:{type:String, required:true, unique:true}
},
{
    versionKey:false,
    timeStamps: true
})
const City = mongoose.model("city",citySchema);

// schema for company

const companySchema = new mongoose.Schema({
    company_name:{type:String, required:true, unique:true},
    job_ids:[
        {type: mongoose.Schema.Types.ObjectId,
        ref:"job",
        required:true
    }],

},
{
    versionKey:false,
    timeStamps: true
})

const Company = mongoose.model("company",companySchema);

const app = express();
app.use(express.json());


//crud for city 
app.post("/cities", async (req,res)=>{
    try{
        const city = await City.create(req.body);
        return res.status(201).send(city);
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})

app.get("/cities", async (req,res)=>{
    try{
        const cities = await City.find().lean().exec();
        return res.send({cities});
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})

app.get("/cities/:id",async(req,res)=>{
    try{
        const city = await City.findById(req.params.id).lean().exec();
        return res.send(city);
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})

app.patch("/cities/:id",async(req,res)=>{
    try{
        const city = await City.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(201).send(city);
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})

app.delete("/cities/:id",async (req,res)=>{
    try{
        const city = await City.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).send(city);
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})



// crud for skill
app.post("/skills", async (req,res)=>{
    try{
        const skill = await Skill.create(req.body);
        return res.status(201).send(skill);
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})

app.get("/skills", async (req,res)=>{
    try{
        const skills = await Skill.find().lean().exec();
        return res.send({skills});
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})

app.get("/skills/:id",async(req,res)=>{
    try{
        const skill = await Skill.findById(req.params.id).lean().exec();
        return res.send(skill);
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})


//crud for jobs

app.post("/jobs", async (req,res)=>{
    try{
        const job = await Job.create(req.body);
        return res.status(201).send(job);
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})

app.get("/jobs", async (req,res)=>{
    try{
        const jobs = await Job.find({work_from_home:true}).lean().exec();
        return res.send({jobs});
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})
app.get("/jobs/rating", async (req,res)=>{
    try{
        const jobs = await Job.find().sort({rating:"asc"}).lean().exec();
        return res.send({jobs});
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})

app.get("/jobs/:id",async(req,res)=>{
    try{
        const job = await Job.findById(req.params.id).lean().exec();
        return res.send(job);
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})

app.patch("/jobs/:id",async(req,res)=>{
    try{
        const job = await Job.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(201).send(job);
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})

app.delete("/jobs/:id",async (req,res)=>{
    try{
        const job = await Job.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).send(job);
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})
app.get("/jobs/:id/")


// crud for company

app.post("/companies", async (req,res)=>{
    try{
        const company = await Company.create(req.body);
        return res.status(201).send(company);
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})

app.get("/companies", async (req,res)=>{
    try{
        const companies = await Company.find().lean().exec();
        return res.send({companies});
    }
    catch(e){
        return res.status(500).json({message:e.message, ststus:"Failed"})
    }
})













app.listen(8823,async function(){
    await connect();
    console.log("listening to PORT 8823")
})