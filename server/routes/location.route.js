const express = require("express");
const locationController = require("../controller/location.controller");
const router = express.Router();

const getAllLocations = (req, res) => {
  // read entire table
  locationController
    .getLocations()
    .then((locations) => {
      res.json(locations);
    })
    .catch((err) => {
      // Database call failed return 500 error
      res.status(500); // 500 Internal Server Error
      res.json({
        "status-code": 500,
        message: err || "failed request",
      });
    });
};

router.get("/all", getAllLocations);
module.exports = router;
