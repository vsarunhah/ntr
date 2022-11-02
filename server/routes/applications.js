const express = require("express");
const crypto = require('crypto');
const {User} = require("../models/user");

const statuses = {
  Applied: 0,
  Interview: 1,
  Offer: 2,
  Rejected: 3,
  Accepted: 4,
};
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const applicationRoutes = express.Router();

// This section will help you get a list of all the applications.
// applicationRoutes.route("/applications").post(function (req, res) {
//   let db_connect = dbo.getDb("employees");
//   let user_id = ObjectId(req.body.user_id);
//   let status_body = req.body["status"];
//   let find_query = { user_id: user_id };
//   //  console.log(status_body);
//   if (Object.keys(statuses).includes(status_body)) {
//     find_query["status"] = statuses[status_body];
//     console.log("find query: ", find_query);
//   }
//   db_connect
//     .collection("applications")
//     .find(find_query)
//     .toArray(function (err, result) {
//       if (err) throw err;
//       for (let i = 0; i < result.length; i++) {
//         result[i].application_id = i;
//       }
//       res.json(result);
//       //  console.log(result);
//     });
// });

// This section will help you update the status of an application.
// applicationRoutes.route("/application/update").post(function (req, res) {
//   let db_connect = dbo.getDb("employees");
//   let user_id = ObjectId(req.body.user_id);
//   let application_id = ObjectId(req.body.application_id);
//   let update_query = {
//     $set: {
//       status: req.body.status,
//     },
//   };
//   db_connect
//     .collection("applications")
//     .updateOne(
//       { _id: application_id, user_id: user_id },
//       update_query,
//       function (err, result) {
//         if (err) throw err;
//         res.json(result);
//         res.status(200).send();
//       }
//     );
// });

// This section will help you delete an application.
// applicationRoutes.route("/application/delete").post(function (req, res) {
//   let db_connect = dbo.getDb("employees");
//   let user_id = ObjectId(req.body.user_id);
//   let application_id = ObjectId(req.body.application_id);
//   db_connect
//     .collection("applications")
//     .deleteOne(
//       { _id: application_id, user_id: user_id },
//       function (err, result) {
//         if (err) throw err;
//         res.json(result);
//         if (result.deletedCount == 1) {
//           res.status(200).send();
//         } else {
//           res.status(500).send();
//         }
//       }
//     );
// });

// This section will help you create a new application.
applicationRoutes.route("/application/create").post(async function (req, res) {
  console.log("application create HERE");
  console.log(req.body);
  let myobj = {
    id: crypto.randomUUID(),
    companyName: req.body.companyName,
    roleName: req.body.roleName,
    applicationStatus: Number(req.body.applicationStatus),
    applicationDate: req.body.applicationDate,
    location: req.body.location,
  };
  let user;
  if (req.body.companyName != null && req.body.companyName != '') {
    user = await User.findOneAndUpdate({_id: req.body.user_id}, {$push: {applications: myobj}});
  }
  res.status(200).send({data: user, message: "Application added"});
});

applicationRoutes.route("/applications").post(async function (req, res) {
  console.log("application get HERE");
  console.log(req.body);
    try {
      if (req.body.status == 'All') {
        let user = await User.findOne({_id: req.body.user_id}).select('applications');
        res.status(200).send({data: user.applications, message: "Applications retrieved"});
      } else {
        let status = statuses[req.body.status];
        // let user = await User.findOne({ _id: req.body.user_id, "applications.applicationStatus": status}).select('applications');
        let user = await User.findOne({ _id: req.body.user_id}).select('applications');
        let applications = user.applications.filter(application => application.applicationStatus == status);
        console.log("filtered applications: ", applications);
        if (applications.length > 0) {
          res.status(200).send({data: applications, message: "Applications found"});
        } else {
          res.status(200).send({data: [], message: "No applications found"});
        }
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
});

applicationRoutes.route("/application/delete").post(async function (req, res) {
  console.log("application delete HERE");
  console.log(req.body);
  try {
    let arr = await User.findOne({ _id: req.body.user_id }).select("applications");
    
    for (var i = arr.applications.length - 1; i >= 0; i--) {
      if (arr.applications[i].id === req.body.application_id) {
        arr.applications.splice(i, 1);
      }
    }

    let user = await User.findOneAndUpdate(
      { _id: req.body.user_id },
      { $set: { applications: arr.applications } }
    );

    response.status(200).send({ data: user, message: "Application deleted" });
  } catch (err) {
    response.status(500).send({ message: err });
  }
});

applicationRoutes.route("/application/update").post(async function (req, res) {
  console.log("application update HERE");
  console.log(req.body);
  let update_query = {
    $set: {
      "applications.$.applicationStatus": req.body.status,
    },
  };
  try {
    user = await User.updateOne(
      { _id: req.body.user_id, "applications.id": req.body.application_id },
      update_query
    );

    res.status(200).send({ message: "Application updated" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

module.exports = applicationRoutes;
