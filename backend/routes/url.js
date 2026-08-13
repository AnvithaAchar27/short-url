const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics, handleGetMyURLs } = require('../controllers/url');

const {
    restrictToLoggedinUserOnly
} = require("../middleware/auth");

const router = express.Router();

router.post(
    "/",
    restrictToLoggedinUserOnly,
    handleGenerateNewShortURL
);

router.get(
    "/analytics/:shortId",
    restrictToLoggedinUserOnly,
    handleGetAnalytics
);

router.get(
    "/my",
    restrictToLoggedinUserOnly,
    handleGetMyURLs
);

module.exports = router;