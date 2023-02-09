const Word = require('../models/Word');
const { promises: fsPromises} = require('fs');


exports.seedWords = async () => {

	console.log('working')
	asyncReadFile('./assets/bank.txt').then(r => console.log("file loaded"));
}

async function asyncReadFile(filename) {
	 try {
        const contents = await fsPromises.readFile(filename, 'utf-8');

        let arr = contents.split(/\r?\n/);

        let objectArr = []


        for (var i = 0; i < arr.length; i++) {
            var split = arr[i].split("-");// just split once


            if(split.length != 1) {
                let stringNum = split[1].trim()
                let num = parseInt(stringNum)

                if(split[0].length > 3 && !isNaN(num)) {

                    let newObj = {word:split[0].trim(),count:num}
                    objectArr.push(newObj)
                }
            }
        }

        await Word.insertMany(objectArr)

        console.log()

        //console.log(arr);
        console.log(objectArr);
        return arr;
    } catch (err) {
        console.log(err);
    }
}