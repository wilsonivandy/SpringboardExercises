const express = require("express");
const ExpressError = require("./expressError")
const app = express();
const itemRoutes = require("./itemRoutes");

app.use(express.json());
app.use("/items", itemRoutes);

// 404 Handler
app.use(function (req, res, next) {
    return new ExpressError("Not Found", 404);
  });

// Generic Error Handler
app.use(function(err, req, res, next) {
    let status = err.status || 500;

    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    })
}) 

app.listen(3000, function(){
    console.log("Server starting on port 3000")
  })

module.exports = app;