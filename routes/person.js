const express = require("express")
const router = express.Router();

const Person = require('../models/person');

router.post('/',async(req,res)=>{
    try {
        const data = req.body;

        const newPerson = new Person(data);
        const response =await newPerson.save();
        console.log("Data Saved");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
});

router.get('/:workType',async (req,res)=>{
    const workType = req.params.workType;

    if(workType=="Manager" || workType=="Chef" || workType=="Waiter"){
        try{
            const response = await Person.find({work:workType});
            console.log(`Data of ${workType} Fetched`);
            res.status(200).json(response);
        }catch(error){
            console.log(`Data Not found`);
            res.status(500).json({message:`Internal Server Error`});
        }
    }else{
        console.log(`Data Not found`);
        res.status(404).json({message:`No person with ${workType} Exists`});
    }
});

router.get('/',async (req,res)=>{
    try{
        const data = await Person.find();
        console.log("Data Fetched");
        res.status(200).json(data);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
});

router.put('/:id',async (req,res)=>{
    const personId = req.params.id;
    try {
        const response = await Person.findByIdAndUpdate(personId,req.body,
            {new:true,runValidators:true}
            );
        if(!response){
            res.status(404).json({message:`No person with ${personId} Exists`});
        }
        console.log(`Data Updated`);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
});

router.delete('/:id',async (req,res)=>{
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json({message:`No person with ${personId} Exists`});
        }
        console.log(`Person Deleted Successfully`);
        res.status(200).json({message:"success"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
})

module.exports = router;