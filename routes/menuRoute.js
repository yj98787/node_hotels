const express = require("express");
const router = express.Router();
const Menu = require('../models/menu')
router.post('/',async (req,res)=>{
    try {
    const data = req.body;

    const newItem = new Menu(data);
    const response = await newItem.save();
    console.log("Item Saved");
    res.status(200).json(response);
    
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message : "Internal Server Error"})
    }
});

router.get('/',async (req,res)=>{
    try {
        const data = await Menu.find();
        console.log("Menu Fetched");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Imternal Server Error"});
    }
});

router.get('/:taste',async(req,res)=>{
    const taste = req.params.taste;
    if(taste=="Sweet"||taste=="Sour"||taste=="Spicy"){
        try {
            const response = await Menu.find({taste:taste});
            console.log(`${taste} Fetched`);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }else{
        console.log(`Unknown taste : ${taste}`);
        res.status(404).json({message:`Unexpected taste`});
    }
});

module.exports = router;