const mongoose = require("mongoose");

async function connectToMongoDB(url) {
    try {
        await mongoose.connect(url);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
}

module.exports = { connectToMongoDB };