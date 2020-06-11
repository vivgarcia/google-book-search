const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

//express parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//uses the route information on "routes/index.js"
app.use(routes);

// connect to mongo database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");

// start server; react is listening on 3000, so need to use 3001
app.listen(PORT, () => console.log(`API Server now listening on PORT ${PORT}!`));