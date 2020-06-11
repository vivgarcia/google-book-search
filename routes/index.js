const path = require("path");
const router = require("express").Router();
//uses the information from "./api/index.js"
const apiRoutes = require("./api");

// set the entire api folder as a route to "/api"
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;