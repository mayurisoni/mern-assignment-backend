const express = require("express");
const app = express();
const morgan = require("morgan");
const userRoute = require("./routes/users")
const techRoute = require("./routes/technology")
const prjRoute = require("./routes/projects")
const bodyParser = require("body-parser")
const taskRoute= require("./routes/task")
const mongoose = require("mongoose");
require('dotenv').config()
var cors = require('cors');

mongoose
  .connect(
    `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@node-rest-app.cfm4qff.mongodb.net/mern_assignment?retryWrites=true&w=majority`
  )
  .then(() => console.log("connection successful"));
mongoose.promise = global.promise;
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
// app.use((req, res, next) => {
//   res.header("Access-control-Allow-Origin", "*");
//   res.header(
//     "Access-control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept,Authorization"
//   );
//   if (req.method == "OPTIONS") {
//     res.header("Access-control-Allow-Origin", "PUT,POST,PATCH,DELETE,GET");
//     return res.status(200).json({});
//   }
//   next();
// });

app.use('/users',userRoute);
app.use('/technologies',techRoute);
app.use('/projects',prjRoute);
app.use('/task',taskRoute)



app.use(function(req, res, next) {

  
  exports.res.success = function ({result={}, code=200, message=""}) {
      return res.json({
          result,
          code,
          message
      })
  }

  
  exports.res.errored = function({errors={}, code=400, message="", result={}}) {
      return res.json({
          errors,
          code,
          message,
          result
      })
  }
  next()
})

app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
})
module.exports = app;
