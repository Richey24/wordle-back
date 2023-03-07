const { BlobServiceClient } = require("@azure/storage-blob")
const { Hebrew } = require("../schema")
require("dotenv").config({ path: "../.env" })
const fs = require("fs")

const blobClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE)
const containerClient = blobClient.getContainerClient("newcontainer")

const addHebrew = async (req, res) => {
    // try {
    const body = req.body
    const file = req.file
    // if (!body.paleoHebrewText || !body.english) {
    //     return res.status(400).json({ message: "More informations are required" })
    // }
    const imageClient = containerClient.getBlockBlobClient(file.filename)
    const response = await imageClient.uploadFile(file.path, {
        blobHTTPHeaders: {
            blobContentType: file.mimetype,
        },
    })

    if (response._response.status !== 201) {
        console.log("error");
    }
    fs.unlink(file.path, (err) => {
        if (err) {
            console.log(err);
        }
    })
    body.correctImage = file.filename
    await Hebrew.create(body)
    res.status(200).json({ message: "Created Successfully" })
    // } catch (error) {
    //     res.status(500).json({ message: "An error occurred" })
    // }
}

module.exports = addHebrew