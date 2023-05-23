const mongoose = require("mongoose");
const config = require("./config/awshost.json");
mongoose
  //.connect("mongodb://localhost/XCAVProperty")
  .connect(
    "mongodb://ec2-3-10-151-194.eu-west-2.compute.amazonaws.com/XCAVProperty"
  )
  .then(() => {
    console.log("Successfuly connected to  DB...");
  })
  .catch((err) => console.log("Could not connect to db", err.message));
const lookup = require("./routes/lookupRoute");
//const authenticate = require("./authenticate");

const express = require("express"); //must install express package
const app = express();
const propertyInfos = require("./routes/propertyInfo");
const personalInfos = require("./routes/personalInfo");

//app.use(authenticate);
app.use("/api/propertyInfo", propertyInfos);
app.use("/api/personalInfo", personalInfos);

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});
