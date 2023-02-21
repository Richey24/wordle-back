const express = require("express")
const { Word } = require("../schema")
const UserScore = require('../models/UserScore');

exports.getAllWords = async (req, res) => {
     
	 const response = []
     const userID = req.userData.id
     const gameLevel = await this.getUserGameLevels(userID, "Crossword Puzzle")

     const level = gameLevel;
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

/**
 * this function get user game level
 * @param  {[type]} userID   [description]
 * @param  {[type]} gameName [description]
 * @return {[type]}          [description]
 */
exports.getUserGameLevels = async (userID, gameName ) => {


	const today = new Date();
	const parseDate = today.toISOString().split('T')[0];

    // ✅ Get the first day of the current week (Sunday)
	const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));

    // ✅ Get the last day of the current week (Saturday)
	const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));

    //check if game level exist
	const highScore = await UserScore.findOne({ user: userID, created_at: {"$gte": firstDay.toISOString().split('T')[0], "$lt": lastDay.toISOString().split('T')[0]} }) 
	if (highScore !== null) {
		return highScore.game_level		
	}
}