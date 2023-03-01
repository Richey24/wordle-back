const { BlobServiceClient } = require("@azure/storage-blob")
const { Hebrew } = require("../schema")
require("dotenv").config({ path: "../.env" })

const blobClient = BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=absa7kzimnaf;AccountKey=8sH4dhZjJa8cMyunmS1iDmwve5hZKLo5kaA1M9ubZScLCJ2oEsuSvWT46P2t+ouKoCwFENosnC4m+AStWRQ+rQ==;EndpointSuffix=core.windows.net")
const containerClient = blobClient.getContainerClient("newcontainer")

const addHebrew = async (req, res) => {
    // try {
    const body = req.body
    const file = req.file
    // if (!body.paleoHebrewText || !body.english) {
    //     return res.status(400).json({ message: "More informations are required" })
    // }
    const imageClient = containerClient.getBlockBlobClient(file.filename)
    const fileString = file.toString("base64")
    const data = Buffer.from(fileString, "base64")
    const response = await imageClient.uploadFile(file.path, {
        blobHTTPHeaders: {
            blobContentType: file.mimetype,
        },
    })

    if (response._response.status !== 201) {
        console.log("error");
    }
    body.correctImage = file.filename
    await Hebrew.create(body)
    res.status(200).json({ message: "Created Successfully" })
    // } catch (error) {
    //     res.status(500).json({ message: "An error occurred" })
    // }
}

module.exports = addHebrew