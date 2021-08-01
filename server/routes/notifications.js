// Required
const express = require("express");
const { getNotifications, acceptPersonRequest } = require("../controllers/notificationsController");
const router = express.Router();

// getNotifications
router.post("/getnotifications",getNotifications);

// acceptPersonRequest
router.post("/acceptpersonrequest",acceptPersonRequest);

// Export
module.exports = router;