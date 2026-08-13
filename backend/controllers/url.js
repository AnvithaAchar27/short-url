const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    if (!body.url)
        return res.status(400).json({ error: "URL is required" });

    const shortID = nanoid(8);

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user.id,
    });

    return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length, analytics: result.visitHistory});
}

async function handleGetMyURLs(req, res) {
    try {
        const urls = await URL.find({
            createdBy: req.user.id
        });

        return res.json({
            urls
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleGetMyURLs
}