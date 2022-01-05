const express = require("express");
const router = express.Router();
const adminCNT = require("../controller/adminCNT");

router.get("/example-get", adminCNT.exampleGet);
router.post("/example-post", adminCNT.examplePost);


module.exports = router;
