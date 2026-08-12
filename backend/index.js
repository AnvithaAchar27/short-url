const express = require('express');
const urlRoutes = require('./routes/url');
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');
const cors = require('cors');

const app = express();
const PORT = 8001;
app.use(cors());

connectToMongoDB("mongodb://localhost:27017/short-url").then(()=> console.log("Connected to MongoDB")).catch((err)=> console.error(err));

app.use(express.json());
app.use("/url", urlRoutes);

app.get('/:shortId', async (req,res) =>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, { $push:{
        visitHistory:{timeStamp: Date.now()}
    }})
    res.redirect(entry.redirectURL)
})


app.listen(PORT, () => console.log(`Server started at PORT: ${PORT} `))