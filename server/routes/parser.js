const express = require("express");
const parserRouter = express.Router();
const {AffindaCredential, AffindaAPI} = require("@affinda/affinda");
const fs = require("fs");
const {User} = require("../models/user");

const credential = new AffindaCredential("ef5d9134ede0341bbf144ef61d2a446ae3f33df7")
const client = new AffindaAPI(credential)

parserRouter.route("/parser/file").post(async function (req, res) {
   const fileName = req.body.fileName;
   //const fileName = "C:\\Users\\ppune\\OneDrive\\Desktop\\Resume\\"+ req.body.fileName;
   console.log("filename received by server : ", fileName);
   const readStream = fs.createReadStream(fileName);

    client.createResume({file: readStream}).then((result) => {
        //console.log("Returned data:");
        //console.dir(result)
        res.json(result);

    }).catch((err) => {
        console.log("An error occurred:");
        console.error(err);
    });
});


// Can also use a URL:

// client.createResume({url: "https://api.affinda.com/static/sample_resumes/example.pdf"}).then((result) => {
//     console.log("Returned data:");
//     console.dir(result)
// }).catch((err) => {
//     console.log("An error occurred:");
//     console.error(err);
// });
 
module.exports = parserRouter;