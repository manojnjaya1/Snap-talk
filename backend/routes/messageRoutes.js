const express= require("express");
const { protect } = require("../middleware/authMiddleware");
const { sendMessages, allMessages, deleteMessages } = require("../controllers/messageController");

const router= express.Router();

router.route("/").post(protect, sendMessages);
router.route("/:messageId").delete(protect, deleteMessages);
router.route("/:chatId").get(protect, allMessages );

module.exports= router;