const mongoose = require("mongoose");

require('dotenv').config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => console.log(`Connection Successful`))
    .catch((e) => console.log(`No Connection`))


const NFT_Schema = new mongoose.Schema({

    StxAddress: {
        type: String,
        required: true,
        max: 64,
        unique: false,
    },
   
    URL: {
        type: String,
        required: true,
        unique: true,
        max: 256,
    },
    time: {
        type: Date,
        required: true,
        unique: false,
    },
    State: {
        type: String,
        required: true,
        unique: false,
        max: 32,
    },
    ZipCode: {
        type: String,
        required: true,
        unique: false,
        max: 32,
    },
    City: {
        type: String,
        required: true,
        unique: false,
        max: 32,
    },
    Phone: {
        type: String,
        required: true,
        unique: false,
        max: 32,
    },
    Address: {
        type: String,
        required: true,
        unique: false,
        max: 256,

    },
   
})

const NFT_MODEL =  mongoose.models.NFT_Data || mongoose.model("NFT_Data", NFT_Schema);

module.exports = {NFT_MODEL}; 
