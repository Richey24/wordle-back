const { BlobServiceClient } = require("@azure/storage-blob")
const { Hebrew } = require("../schema")
const fs = require("fs")
require("dotenv").config({ path: "../.env" })

const blobClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE)
const containerClient = blobClient.getContainerClient("newcontainer")

const updateHebrew = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const file = req.file
        if (!id) {
            return res.status(400).json({ message: "ID is required" })
        }
        if (file) {
            const imageClient = containerClient.getBlockBlobClient(file.filename)
            const response = await imageClient.uploadFile(file.path, {
                blobHTTPHeaders: {
                    blobContentType: file.mimetype,
                },
            })

            if (response._response.status !== 201) {
                console.log("error");
            }
        }
        fs.unlink(file.path, (err) => {
            if (err) {
                console.log(err);
            }
        })
        body.correctImage = file.filename
        await Hebrew.findByIdAndUpdate(id, body)
        res.status(200).json({ message: "Updated Successfully" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred" })
    }
}

module.exports = updateHebrew