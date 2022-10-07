const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/record"));
app.use(require("./routes/users"));
app.use(require("./routes/auth"));
app.use(require("./routes/passwordReset"));
app.use(require("./routes/google"));
app.use(require("./routes/applications.tsx"));
// get driver connection
const dbo = require("./db/conn");

dbo.connectToServer(function (err) {
  if (err) console.error(err);

});
dbo.mongooseConnect();
 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});