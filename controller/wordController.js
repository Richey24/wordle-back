const express = require("express")
const { Word } = require("../schema")
const UserScore = require('../models/UserScore');
exports.getAllWords = async (req, res) => {
     
	 const response = []


	 // const user = getUserDate()
	 // const userLevel = UserScore.find({user_id: user._id})

     const level = 1;
     const limit = 20000;

     if (level == 1) {
        const limit = 20000;
     }

     if (level == 2) {
         const limit = 10000;
     }

     if (level == 3) {
        const limit = 5000;
     }

     if (level == 4) {
        const limit = 1000;
     }

     if (level >= 5) {
        const limit = 1000;
     }

     const words = await Word.find({ word: { "$gte": limit}}).limit(2080)
     words.sort(() => Math.random() - 0.5)
     

     words.forEach((values,keys)=>{
         response.push(values.word.toLowerCase())
     });

     res.status(200).json(response)
}