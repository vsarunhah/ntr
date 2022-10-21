const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/record"));
app.use(require("./routes/review"));
app.use(require("./routes/dbprofile"));
app.use(require("./routes/users"));
app.use(require("./routes/auth"));
app.use(require("./routes/passwordReset"));
app.use(require("./routes/exp"));
app.use(require("./routes/education"));
app.use(require("./routes/project"));
app.use(require("./routes/applications.tsx"));
app.use(require("./routes/google"));
app.use(require("./routes/profile"));
// get driver connection
const dbo = require("./db/conn");

dbo.connectToServer(function (err) {
  if (err) console.error(err);
});
dbo.mongooseConnect();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
