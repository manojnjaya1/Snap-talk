const express=require('express');
const { protect } = require('../middleware/authMiddleware');
const { accessChats, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatController');

const router = express.Router();

router.route('/').post(protect, accessChats);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroup);
router.route('/add').put(protect, addToGroup);
router.route('/remove').put(protect, removeFromGroup);

module.exports = router;